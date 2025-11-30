import { useCallback, useEffect, useRef, useState } from "react";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Button } from "@/components/ui/button";
import { DialogBox } from "@/components/DialogBox";
import { Title } from "@/components/ui/title";
import { DialogDropDown } from "@/components/ui/custom/dialogDropDown";
import {
  ChevronDown,
  Image,
  Redo,
  Save,
  Shapes,
  Trash,
  Undo,
  ImageDown,
  FileDown,
} from "lucide-react";
import { debounce } from "lodash";
import { sha256 } from "crypto-hash";
import "./fabric-history"; 
import CanvasCore from "./canvas.core"; // import your core file
import {
  ADD_SHAPE_OPTIONS,
  DELETE_OPTIONS,
  OPEN_OPTIONS,
} from "./designer-icons";
import RectangleControls from "./Controls/rectControls";
import CircleControls from "./Controls/circleControls";
import TextControls from "./Controls/textControls";
import ImageControls from "./Controls/imageFitControl";
import TriangleControls from "./Controls/triangleControls";
import { ACTIONS } from "./Constants/actions";
import SaveModalJsx from "./Templates/saveModal";
import SaveTemplateModal from "./Templates/saveTemplateModal";
import { createJSON, getNewID } from "./helper";
import "./googlefonts.css";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const canvasCoreRef = useRef(null);
  const canvasInstanceRef = useRef(null);

  const [activeElementType, setActiveElementType] = useState("");
  const [activeElementProps, setActiveElementProps] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [canvasHeight,setCanvasHeight]=useState(500);
  const [canvasWidth,setCanvasWidth]=useState(500);

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

    const dropListener= async (e, canvas) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if(!file.type.match(/image|svg/)) {
        alert("Unsupported file type");
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileURL = event.target.result;
        let obj=null;
        if (file.type.includes("svg+xml") || file.name.endsWith(".svg")) {
          const svgText = await file.text();
          obj= await canvasCoreRef.current.getSvgFromString({
            svgStr: svgText,
            name: "Dropped SVG",
            top: 50,
            left: 50,
          });
        }
        else if (file.type.includes("image")) {
         obj= await canvasCoreRef.current.addImgFromURL(fileURL, {
            left: 100,
            top: 100,
            selectable: true,
          });
          // Get canvas dimensions
        }  
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

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

        canvas.add(obj);
        canvas.centerObject(obj);
        canvas.renderAll();
        console.log(fileURL)
      }
      reader.readAsDataURL(file);
    }

    const drawRulers = () => {
      const topCanvas = document.getElementById("ruler-top");
      const leftCanvas = document.getElementById("ruler-left");
      const tCtx = topCanvas.getContext("2d");
      const lCtx = leftCanvas.getContext("2d");
      const zoomVal = zoom;

      topCanvas.width = topCanvas.offsetWidth;
      topCanvas.height = 30;
      tCtx.clearRect(0, 0, topCanvas.width, 30);
      tCtx.fillStyle = "#999";

      for (let i = 0; i < topCanvas.width / zoomVal; i += 10) {
        const x = i * zoomVal;
        const height = i % 50 === 0 ? 20 : 10;
        tCtx.fillRect(x, 30 - height, 1, height);
      }

      leftCanvas.height = leftCanvas.offsetHeight;
      leftCanvas.width = 30;
      lCtx.clearRect(0, 0, 30, leftCanvas.height);
      lCtx.fillStyle = "#999";

      for (let i = 0; i < leftCanvas.height / zoomVal; i += 10) {
        const y = i * zoomVal;
        const width = i % 50 === 0 ? 20 : 10;
        lCtx.fillRect(30 - width, y, width, 1);
      }
    };


    const enableZoomAndPan = (canvas) => {
      // ----- Zoom on wheel -----
      canvas.on("mouse:wheel", function (opt) {
        let delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta; // smooth
        zoom = Math.min(5, Math.max(zoom, 0.2)); // zoom limits
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      // ----- Pan Variables -----
      let panning = false;

      canvas.on("mouse:down", function (opt) {
        if (opt.e.spaceKey || opt.e.button === 1) {
          panning = true;
          canvas.selection = false;
          canvas.setCursor("grab");
        }
      });

      canvas.on("mouse:move", function (opt) {
        if (panning) {
          const delta = new fabric.Point(opt.e.movementX, opt.e.movementY);
          canvas.relativePan(delta);
        }
      });

      canvas.on("mouse:up", function () {
        panning = false;
        canvas.selection = true;
        canvas.setCursor("default");
      });

      // Detect space key state
      document.addEventListener("keydown", (e) => (e.key === " " ? (e.spaceKey = true) : null));
      document.addEventListener("keyup", (e) => (e.key === " " ? (e.spaceKey = false) : null));
    };
    
    useEffect(() => {
      const initCanvas = async () => {
        canvasCoreRef.current = new CanvasCore();
        canvasInstanceRef.current = await canvasCoreRef.current._init({
          canvasId: "main",
          width: canvasWidth,
          height: canvasHeight,
          selection: true,
        });
        
        // Enable drag & drop
        enableDragDrop(canvasInstanceRef.current);
        enableZoomAndPan(canvasInstanceRef.current)
        canvasInstanceRef.current.on("object:moving", (e) => {
          const obj = e.target;
          const canvasCenter = canvasInstanceRef.current.getCenter();
          const snapTolerance = 5;

          if (Math.abs(obj.left - canvasCenter.left) < snapTolerance) obj.left = canvasCenter.left;
          if (Math.abs(obj.top - canvasCenter.top) < snapTolerance) obj.top = canvasCenter.top;
          console.log(canvasCenter)
          canvasInstanceRef.current.renderAll();
        });
        // Listen for selection changes
      canvasInstanceRef.current.on("selection:updated", updateActiveProps);
      canvasInstanceRef.current.on("selection:created", updateActiveProps);
      canvasInstanceRef.current.on("selection:cleared", () => setActiveElementProps(null));
    };
    
    initCanvas();
    const canvasElem = document.getElementById("canvas-wrapper");

    return () => {
      // Cleanup must be synchronous
      if (canvasCoreRef.current?.canvas) {
        canvasInstanceRef.current.off("selection:updated", updateActiveProps);
        canvasInstanceRef.current.off("selection:created", updateActiveProps);
        canvasInstanceRef.current.off("selection:cleared", updateActiveProps);
        canvasInstanceRef.current.off("mouse:wheel");
        canvasInstanceRef.current.off("mouse:down");
        canvasInstanceRef.current.off("mouse:move");
        canvasInstanceRef.current.off("mouse:up");
        // canvasElem.removeEventListener("dragover", fn);
        canvasElem.removeEventListener("drop", dropListener);
        canvasCoreRef.current.canvas.dispose();
      }
    };
  }, []);

  useEffect(() => drawRulers(), [zoom]);

  const undo = async () => {
  await canvasCoreRef.current.canvas.undo();
  canvasCoreRef.current.canvas.renderAll();
  };

  const redo = async () => {
    await canvasCoreRef.current.canvas.redo();
    canvasCoreRef.current.canvas.renderAll();
  };

  const updateActiveProps = debounce(() => {
    const obj = canvasCoreRef.current.canvas.getActiveObject();
    console.log(obj)
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


  const enableDragDrop = (canvas) => {
    const canvasWrapperElement = document.getElementById("canvas-wrapper");
    canvasWrapperElement.addEventListener("dragover", (e) => e.preventDefault());
    canvasWrapperElement.addEventListener("drop", (e) => dropListener(e, canvas));
  };

  const addImage = async () => {
    const url = prompt("Enter Image URL:");
    if (!url) return;
    await canvasCoreRef.current.addImgFromURL(url, {
      left: 100,
      top: 100,
      selectable: true,
    });
    canvasInstanceRef.current.renderAll();
  };

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

  const controlMap = {
    rect: RectangleControls,
    circle: CircleControls,
    "i-text": TextControls,
    image: ImageControls,
    triangle: TriangleControls
  };

  const ActiveControl = controlMap[activeElementType];

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="flex gap-3 mt-4 mb-2">
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
            options={OPEN_OPTIONS}
            onSelect={(option) => {
              if (!canvasCoreRef.current?.canvas) return;
              if(option.name==="Add Image From URL"){
                addImage()
              }
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
            onSelect={(option) => onChange(option.value)}
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
            onSelect={(option) => deleteElement()}
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
          <canvas id="ruler-top" style={{ height: "10px", width: canvasWidth, background:"#fafafa" }} className="absolute ml-[10px]"></canvas>
          <canvas id="ruler-left" style={{ width: "10px", height: canvasHeight, background:"#fafafa" }} className="absolute mt-[10px]"></canvas>
          <div
            id="canvas-wrapper"
            className="border border-gray-300 shadow-lg ml-[10px] mt-[10px]"
            style={{ width: canvasWidth, height: canvasHeight }}
          >
            <canvas id="canvas-main" ref={canvasRef}></canvas>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 my-2">
          <p className="text-sm text-gray-600">Drag & Drop image or SVG onto canvas</p>
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

        {activeElementProps && <div className="border border-amber-500 p-2">
          {ActiveControl && <ActiveControl canvas={canvasInstanceRef.current} activeElementProps={activeElementProps} setActiveElementProps={updateActiveProps} />}
        </div>}
    </div>
  );
};

export default ImageEditor;
