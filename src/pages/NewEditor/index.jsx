import { useCallback, useEffect, useRef, useState } from "react";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Button } from "@/components/ui/button";
import { DialogBox } from "@/components/DialogBox";
import { Title } from "@/components/ui/title";
import { DialogDropDown } from "@/components/ui/custom/dialogDropDown";
import {
  ChevronDown, Image, Redo, Save, Shapes,
  Trash, Undo, ImageDown, FileDown,
  FileUp,
  FileSpreadsheet,
  FileCog,
} from "lucide-react";
import { debounce } from "lodash";
import { sha256 } from "crypto-hash";
import "./fabric-history";

import CanvasCore from "./canvas.core";
import { ADD_SHAPE_OPTIONS, DELETE_OPTIONS, ADD_OPTIONS } from "./designer-icons";
import SaveModalJsx from "./Templates/saveModal";
import SaveTemplateModal from "./Templates/saveTemplateModal";

import { createJSON, getNewID } from "./helper";
import { ACTIONS } from "./Constants/actions";

import { enableZoomAndPan } from "./utils/zoomPan";
import { enableDragDrop } from "./utils/dragDrop";
import { drawRulers } from "./utils/rulers";
import { controlMap } from "./controlMap";
import { Input } from "@/components/ui/input";
import "./googlefonts.css";
import { enableExtraListeners } from "./utils/enableExtraListeners";
import CardGallery from "./card";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const canvasCoreRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeElementType, setActiveElementType] = useState("");
  const [activeElementProps, setActiveElementProps] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [canvasHeight,setCanvasHeight]=useState(480);
  const [canvasWidth,setCanvasWidth]=useState(480);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const jsonInputRef = useRef(null);

  const loadCanvasFromJSON = (json) => {
    const canvas = canvasInstanceRef.current;

    // Resize canvas based on JSON
    if (json.width && json.height) {
      canvas.setWidth(json.width);
      canvas.setHeight(json.height);
      // update React state if you track it
      setCanvasWidth(json.width);
      setCanvasHeight(json.height);
    }

    // Load objects from JSON
    canvas.loadFromJSON(json, () => {
      canvas.renderAll();
    });
  };

  const handleJSONUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("sda")
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      loadCanvasFromJSON(json);
    };
    reader.readAsText(file);
  };

  const bringToFront = () => {
    const obj = canvasInstanceRef.current.getActiveObject();
    if (!obj) return;
    canvasInstanceRef.current.bringToFront(obj);
    canvasInstanceRef.current.renderAll();
  };

  const bringForward = () => {
    const obj = canvasInstanceRef.current.getActiveObject();
    if (!obj) return;
    canvasInstanceRef.current.bringForward(obj);
    canvasInstanceRef.current.renderAll();
  };

  const sendBackward = () => {
    const obj = canvasInstanceRef.current.getActiveObject();
    if (!obj) return;
    canvasInstanceRef.current.sendBackwards(obj);
    canvasInstanceRef.current.renderAll();
  };

  const sendToBack = () => {
    const obj = canvasInstanceRef.current.getActiveObject();
    if (!obj) return;
    canvasInstanceRef.current.sendToBack(obj);
    canvasInstanceRef.current.renderAll();
  };

  const deleteSelected = () => {
    const obj = canvasInstanceRef.current.getActiveObject();
    if (obj) canvasInstanceRef.current.remove(obj);
    canvasInstanceRef.current.renderAll();
  };

  // const OPEN_OPTIONS=[    {
  //     name: "Select a Template",
  //     value: ACTIONS.UPLOAD_JSON,
  //     modalJsx: (  

  //     ),
  //   },
  //   {
  //     name: "Open Template From File",
  //     modalJsx: <div className="flex items-center h-[27px] cursor-pointer gap-2">
  //     <FileUp /> Open Template From File
  //     </div>,
  //     value: "raw_data",
  //   },
  // ]

  const addImageFromDevice = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    if(!file.type.match(/image|svg/)) {
      alert("Unsupported file type");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;

      let obj=null;
      if (file.type.includes("svg+xml") || file.name.endsWith(".svg")) {
        const svgText = await file.text();
        obj= await canvasCoreRef.getSvgFromString({
          svgStr: svgText,
          name: "Dropped SVG",
          top: 50,
          left: 50,
        });
      } else {
        // PNG/JPG
        obj= await canvasCoreRef.current.addImgFromURL(dataUrl, {
          left: 100,
          top: 100,
          selectable: true,
        });
        // console.log(canvasInstanceRef.current)
      }
      const canvasWidth = canvasInstanceRef.current.getWidth();
      const canvasHeight = canvasInstanceRef.current.getHeight();

      // Get SVG original dimensions
      const bounds = obj.getBoundingRect();
      const { width, height } = bounds;

      // Max allowed size (75% of canvas)
      const maxWidth = canvasWidth * 0.75;
      const maxHeight = canvasHeight * 0.75;

      // Determine scale factor
      let scale = 1;
      if (width > maxWidth || height > maxHeight) {
        scale = Math.min(maxWidth / width, maxHeight / height);
      }
      // Apply proportional scale
      obj.scale(scale);

      canvasInstanceRef.current.add(obj);
      canvasInstanceRef.current.centerObject(obj);
      canvasInstanceRef.current.renderAll();
      console.log(fileURL)
    };
    reader.readAsDataURL(file);
  };

  const setCanvasZoom = (value) => {
    const canvas = canvasCoreRef.current.canvas;
    const zoomValue = Math.min(5, Math.max(value, 0.2));
    setZoom(zoomValue);

    canvas.zoomToPoint(
      new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2),
      zoomValue
    );
    canvas.renderAll();
  };

  const resetZoom = () => setCanvasZoom(1);
  
  const CANVAS_OPTIONS = [
    {
      name: "Save Image",
      value: ACTIONS.SAVE_PAGE_TO_LIBRARY,
      modalJsx: (
        <DialogBox
          title="Download Image"
          trigger={
            <div className="flex items-center cursor-pointer gap-2">
              <ImageDown />
              Download Image
            </div>
          }
          modalJsx={
            <SaveModalJsx
              // self={this}
              thumbnailUrl={null}
              canvas={canvasInstanceRef.current}
              defaultFileName={"canvas"}
              defaultFileType={"jpeg"}
              imageWidth={canvasInstanceRef.current?.width}
              ratio={canvasInstanceRef.current?.width / canvasInstanceRef.current?.height}
            />
          }
        />
      ),
    },
    {
      name: "Save My Template",
      value: ACTIONS.UPLOAD_JSON,
      modalJsx: (
        <DialogBox
          title="Image"
          // theme={theme}
          trigger={
            <div className="flex items-center h-[27px] cursor-pointer gap-2">
              <FileDown />
              Download Canvas JSON
            </div>
          }
          modalJsx={
            <>
              <SaveTemplateModal
                JsonNodes={{}}
                imgNodes={{}}
                allNames={[]}
                currImgDataUrl={null}
                onCancel={() => {}}
                onSave={async (fileName) => {
                  const temp = createJSON(this, canvasInstanceRef.current);
                  const hash = await sha256(JSON.stringify(temp));
                  temp.hash = hash;
                  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(temp)
                  )}`;
                  const link = document.createElement("a");
                  link.href = jsonString;
                  if (fileName === "") link.download = "sample.json";
                  else link.download = fileName + ".json";
                  link.click();
                }}
                onOverWrite={() => {}}
                />
            </>
          }
          />
        ),
    },
  ];

  /** ----- Update Active Props ------ */
  const updateActiveProps = debounce(() => {
    const obj = canvasCoreRef.current.canvas.getActiveObject();
    if (obj) {
      setActiveElementType(obj.type);

      setActiveElementProps((prev) => ({
        ...prev,
        backgroundColor: obj.backgroundColor || "",
        color: obj.fill,
        stroke: obj.stroke || "#000",
        strokeWidth: obj.strokeWidth || 0,
        fontFamily: obj.fontFamily,
        BorderLock: obj.BorderLock,
        rx: obj.rx,
        ry: obj.ry,
        width: obj.width,
        height: obj.height,
        imageFit: obj.imageFit,
        patternActive: obj.patternActive,
      }));
    } else {
      setActiveElementType("");
      setActiveElementProps({});
    }
  }, 100);
    
  useEffect(() => {
    const initCanvas = async () => {
      canvasCoreRef.current = new CanvasCore();
      canvasInstanceRef.current = await canvasCoreRef.current._init({
        canvasId: "main",
        width: canvasWidth,
        height: canvasHeight,
        selection: true,
      });

      enableZoomAndPan(canvasInstanceRef.current);
      enableDragDrop(canvasInstanceRef.current, canvasCoreRef.current);
      enableExtraListeners(canvasInstanceRef.current, updateActiveProps);
      const canvas = canvasInstanceRef.current;
      const handleRightClick = (e) => {
        e.preventDefault();

        const canvas = canvasInstanceRef.current;
        const target = canvas.findTarget(e);

        if (target) canvas.setActiveObject(target);

        const wrapper = document.getElementById("canvas-wrapper");
        const rect = wrapper.getBoundingClientRect();

        setContextMenu({
          visible: true,
          x: e.clientX - rect.left, // position inside wrapper
          y: e.clientY - rect.top,
        });
        canvas.renderAll();
      };

      canvas.upperCanvasEl.addEventListener("contextmenu", handleRightClick);

      const hideMenu = () => setContextMenu((prev) => ({ ...prev, visible: false }));
      window.addEventListener("click", hideMenu);
    };

    initCanvas();


    // return () => {
    //   canvas.upperCanvasEl.removeEventListener("contextmenu", handleRightClick);
    //   window.removeEventListener("click", hideMenu);
    // };
  }, []);

  /** ----- Draw rulers on zoom change ----- */
  useEffect(() => drawRulers(zoom, canvasWidth, canvasHeight), [zoom]);

  const undo = async () => {
    await canvasCoreRef.current.canvas.undo();
    canvasCoreRef.current.canvas.renderAll();
  };

  const redo = async () => {
    await canvasCoreRef.current.canvas.redo();
    canvasCoreRef.current.canvas.renderAll();
  };

  const addImage =useCallback(async () => {
    const url = prompt("Enter Image URL:");
    if (!url) return;
    await canvasCoreRef.current.addImgFromURL(url, {
      left: 100,
      top: 100,
      selectable: true,
    });
    canvasInstanceRef.current.renderAll();
  }, [canvasInstanceRef.current]);

  const addText = useCallback(async () => {

    const textObj = await canvasCoreRef.current.getIText("Hello World", {
      id: getNewID(),
      type: "i-text",
      left: 150,
      top: 150,
      fontSize: 32,
      type: "i-text",
      name: "text",
      fontFamily: "Ubuntu",
      fontSize: 48,
      backgroundColor: "rgba(255,255,255,0)",
      fill: "#000",
      stroke: "#000",
      strokeWidth: 0,
    });
    canvasInstanceRef.current.add(textObj);
    canvasInstanceRef.current.setActiveObject(textObj);
  }, [canvasInstanceRef.current]);

  const addRect = useCallback(() => {
    const rect = canvasCoreRef.current.getRect({
      id: getNewID(),
      type: "rect",
      fill: "rgba(196, 232, 188, 0.44)",
      stroke: "#000",
      strokeWidth: 1,
      backgroundColor: "rgba(0,0,0,0)",
      width: 120,
      height: 80,
      left: 200,
      top: 200,
    });
    canvasInstanceRef.current.add(rect);
    canvasInstanceRef.current.setActiveObject(rect);
  }, [canvasInstanceRef.current]);

  const addCircle = useCallback(() => {
    const circ = canvasCoreRef.current.getCircle({
      id: getNewID(),
      type: "circle",
      fill: "rgba(196, 232, 188, 0.44)",
      stroke: "#000",
      strokeWidth: 1,
      backgroundColor: "rgba(0,0,0,0)",
      radius: 50,
      left: 200,
      top: 200,
    });
    canvasInstanceRef.current.add(circ);
    canvasInstanceRef.current.setActiveObject(circ);
  }, [canvasInstanceRef.current]);

  const addTriangle = useCallback(() => {
    const tri = canvasCoreRef.current.getTriangle({
      id: getNewID(),
      type: "triangle",
      fill: "rgba(196, 232, 188, 0.44)",
      stroke: "#000",
      strokeWidth: 1,
      backgroundColor: "rgba(0,0,0,0)",
      left: 200,
      top: 200,
      });
    canvasInstanceRef.current.add(tri);
    canvasInstanceRef.current.setActiveObject(tri);

  }, [canvasInstanceRef.current]);

  const deleteElement = useCallback(() => {
    const activeObj = canvasInstanceRef.current.getActiveObject();
    if (activeObj) {
      canvasInstanceRef.current.remove(activeObj);
      canvasInstanceRef.current.renderAll();
    }
  }, [canvasInstanceRef.current]);

  const ActiveControl = controlMap[activeElementType];

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
      <div className="flex gap-3 mt-4 mb-2">
        <DialogBox
          title="Image"
          trigger={
            <Button  title="Select a template"
              size="icon-xs"
              // variant="outline"
              className="flex items-center gap-0"
            >
              <FileSpreadsheet />
            </Button>
          }
          modalJsx={
            <CardGallery onSelect={(card)=>{
              loadCanvasFromJSON(card)
            }}/>
          }
          />
          <MenuButton
            title="Add shapes"
            options={ADD_SHAPE_OPTIONS}
            onSelect={(option) => {
              if (!canvasCoreRef.current?.canvas) return;
              switch(option.value){
                case "add-text": 
                addText();
                break;
                case "circle": 
                addCircle();
                break;
                case "rectangle":
                addRect();
                break;
                case "triangle": 
                addTriangle();
                break;
              }
            }}
          >
            <Button
              size="icon-xs"
              // variant="outline"
              className="flex items-center gap-0"
            >
              <Shapes />
              <ChevronDown />
            </Button>
          </MenuButton>
          <MenuButton
            title="Add Image"
            options={ADD_OPTIONS}
            onSelect={(option) => {
              if (!canvasCoreRef.current?.canvas) return;
              if (option.name === "Add Image From URL") addImage();
              if (option.name === "Upload from Device") fileInputRef.current.click();
              if (option.name === "Open Template From File") jsonInputRef.current.click();
             }}
          >
            <Button
              size="icon-xs"
              className="flex items-center gap-0"
            >
              <Image />
              <ChevronDown />
            </Button>
          </MenuButton>

          <DialogDropDown
            title="Save to cloud"
            options={CANVAS_OPTIONS}
          >
            <Button
              size="icon-xs"
              className="flex items-center gap-0"
            >
              <Save />
              <ChevronDown />
            </Button>
          </DialogDropDown>
        
          <Title title={"Undo last action"}>
            <Button
              className="cursor-pointer"
              size="icon-xs"
              onClick={() => undo()}
              disabled={!canvasCoreRef.current?.canvas?.historyUndo.length}
            >
              <Undo />
            </Button>
          </Title>
        
          <Title title={"Redo last action"}>
            <Button
              className="cursor-pointer"
              size="icon-xs"
              disabled={!canvasCoreRef.current?.canvas?.historyRedo.length}
              onClick={() => redo()}
            >
              <Redo />
            </Button>
          </Title>
        
          <MenuButton
            title="Reset page"
            options={DELETE_OPTIONS}
            onSelect={(option) => {
              if(option.name==="Clear Page"){
                 canvasCoreRef.current.canvas.clear()
              } else{
                deleteElement()
              }
            }}
          >
            <Button
              size="icon-xs"
              className="flex items-center gap-0"
            >
              <Trash />
              <ChevronDown />
            </Button>
          </MenuButton>
        </div>
        <div className="relative">
          <canvas id="ruler-top" style={{ height: "10px", width: canvasWidth }} className="absolute ml-[10px]"></canvas>
          <canvas id="ruler-left" style={{ width: "10px", height: canvasHeight }} className="absolute mt-[10px]"></canvas>
          <div
            id="canvas-wrapper"
            className="border border-gray-300 shadow-lg ml-[10px] mt-[10px]"
            style={{ width: canvasWidth, height: canvasHeight }}
          >
            <canvas id="canvas-main" ref={canvasRef}></canvas>
          </div>
          {contextMenu.visible && (
            <ul
              className="absolute bg-white shadow-lg border rounded text-sm"
              style={{
                top: contextMenu.y,
                left: contextMenu.x,
                zIndex: 9999,
                width: "160px",
              }}
            >
              <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-slate-400" onClick={bringToFront}>Bring to Front</li>
              <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-slate-400" onClick={bringForward}>Bring Forward</li>
              <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-slate-400" onClick={sendBackward}>Send Backward</li>
              <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-slate-400" onClick={sendToBack}>Send to Back</li>
              <li className="px-2 py-1 hover:bg-red-100 cursor-pointer text-red-600" onClick={deleteSelected}>Delete</li>
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 my-2">
          <p className="text-sm">Drag & Drop image or SVG onto canvas</p>
          <div className="flex gap-2">

          <Button onClick={resetZoom}>Reset Zoom</Button>
          
          <input
            type="range"
            min="0.2"
            max="5"
            step="0.01"
            value={zoom}
            onChange={(e) => setCanvasZoom(parseFloat(e.target.value))}
            className="w-30"
          />

          <span className="text-sm">{Math.round(zoom * 100)}%</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.svg"
        style={{ display: "none" }}
        onChange={addImageFromDevice}
      />
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={jsonInputRef}
        onChange={handleJSONUpload}
      />

        <div className="border border-amber-500 p-2 flex gap-2">
          <div className="max-w-[85px]">
          <Input
            label="Canvas Witdh:"
            type={"number"}
            value={canvasWidth}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setCanvasWidth(Number(e.target.value))
                canvasCoreRef.current.canvas.setWidth(Number(e.target.value));
              }
            }}
            />
            </div>
          <div className="max-w-[85px]">
            <Input
              label="Canvas Height:"
              type={"number"}
              value={canvasHeight}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setCanvasHeight(Number(e.target.value))
                  canvasCoreRef.current.canvas.setHeight(Number(e.target.value));
                }
              }}
            />
            </div>
          {ActiveControl && <ActiveControl canvas={canvasInstanceRef.current} activeElementProps={activeElementProps} setActiveElementProps={updateActiveProps} />}
        </div>
    </div>
  );
};

export default ImageEditor;
