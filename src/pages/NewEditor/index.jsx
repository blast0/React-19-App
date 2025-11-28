import { useEffect, useRef, useState } from "react";
import CanvasCore from "./canvas.core"; // import your core file
import "./fabric-history"; 
import BackgroundColorControl from "./Controls/backgroundColor";
import RectangleControls from "./Controls/rectControls";
import CircleControls from "./Controls/circleControls";
import TextControls from "./Controls/textControls";
import ImageControls from "./Controls/imageFitControl";


const FabricEditor2 = () => {
  const canvasRef = useRef(null);
  const canvasCoreRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [activeElementType, setActiveElementType] = useState("");
  const [activeElementProps, setActiveElementProps] = useState(null);

  useEffect(() => {
    const initCanvas = async () => {
      canvasCoreRef.current = new CanvasCore();
      const canvasObj = await canvasCoreRef.current._init({
        canvasId: "main",
        width: 1280,
        height: 600,
        selection: true,
      });

      setCanvasInstance(canvasObj);
      // Enable drag & drop
      enableDragDrop(canvasObj);

      // Listen for selection changes
      canvasObj.on("selection:updated", updateActiveProps);
      canvasObj.on("selection:created", updateActiveProps);
      canvasObj.on("selection:cleared", () => setActiveElementProps(null));
    };

    initCanvas();

    return () => {
      // Cleanup must be synchronous
      if (canvasCoreRef.current) {
        canvasCoreRef.current.canvas.dispose();
      }
    };
  }, []);

  const undo = async () => {
  await canvasCoreRef.current.canvas.undo();
  canvasCoreRef.current.canvas.renderAll();
  };

  const redo = async () => {
    await canvasCoreRef.current.canvas.redo();
    canvasCoreRef.current.canvas.renderAll();
  };

  const updateActiveProps = () => {
    const obj = canvasCoreRef.current.canvas.getActiveObject();
    console.log(obj)
    if (obj) {
      setActiveElementType(obj.type);

      setActiveElementProps((prev) => ({
        ...prev,
        backgroundColor: obj.backgroundColor || "",
        color: obj.fill,
        stroke: obj.stroke || "#000",
        strokewidth: obj.strokewidth || 0,
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
  };
;


  const enableDragDrop = (canvas) => {
    const canvasElem = document.getElementById("canvas-wrapper");

    canvasElem.addEventListener("dragover", (e) => e.preventDefault());
    canvasElem.addEventListener("drop", async (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;

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
    });
  };

  const addImage = async () => {
    const url = prompt("Enter Image URL:");
    if (!url) return;
    await canvasCoreRef.current.addImgFromURL(url, {
      left: 100,
      top: 100,
      selectable: true,
    });
    canvasInstance.renderAll();
  };

  const addText = async () => {
    const textObj = await canvasCoreRef.current.getIText("Hello World", {
      left: 150,
      top: 150,
      fontSize: 32,
      fill: "black",
    });
    console.log(canvasInstance, canvasCoreRef)
    canvasInstance.add(textObj);
    canvasInstance.renderAll();
  };

  const addRect = () => {
    const rect = canvasCoreRef.current.getRect({
      width: 120,
      height: 80,
      fill: "#f87171",
      left: 200,
      top: 200,
    });
    canvasInstance.add(rect);
  };

  const addCircle = () => {
    const circ = canvasCoreRef.current.getCircle({
      radius: 50,
      fill: "#60a5fa",
      left: 200,
      top: 200,
    });
    canvasInstance.add(circ);
  };

  const deleteElement = () => {
    const activeObj = canvasInstance.getActiveObject();
    if (activeObj) {
      canvasInstance.remove(activeObj);
      canvasInstance.renderAll();
    }
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      {/* <h2 className="text-2xl font-semibold mb-4">Fabric.js Editor</h2> */}

      <div className="flex gap-3 my-4">
        <button onClick={addImage} className="px-4 py-2 bg-green-600 text-white rounded">
          Add Image
        </button>
        <button onClick={addText} className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Text
        </button>
        <button onClick={addRect} className="px-4 py-2 bg-purple-600 text-white rounded">
          Add Rect
        </button>
        <button onClick={addCircle} className="px-4 py-2 bg-indigo-600 text-white rounded">
          Add Circle
        </button>
        <button onClick={deleteElement} className="px-4 py-2 bg-red-600 text-white rounded">
          Delete Selected
        </button>
        <button
          onClick={undo}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Redo
        </button>
      </div>

      <div
        id="canvas-wrapper"
        className="border border-gray-300 shadow-lg"
        style={{ width: 1280, height: 600 }}
      >
        <canvas id="canvas-main" ref={canvasRef}></canvas>
      </div>
      <p className="text-sm text-gray-600 mt-3">Drag & Drop image or SVG onto canvas</p>

        {activeElementProps && <div className="border border-amber-500 p-2">
          {canvasInstance && activeElementType === "rect" && (
            <RectangleControls
              canvas={canvasInstance}
              activeElementProps={activeElementProps}
              setActiveElementProps={updateActiveProps}
            />
          )}

          {canvasInstance && activeElementType === "circle" && (
            <CircleControls
              canvas={canvasInstance}
              activeElementProps={activeElementProps}
              setActiveElementProps={updateActiveProps}
            />
          )}

          {canvasInstance && activeElementType === "i-text" && (
            <TextControls
              canvas={canvasInstance}
              activeElementProps={activeElementProps}
              setActiveElementProps={updateActiveProps}
            />
          )}

          {canvasInstance && activeElementType === "image" && (
            <ImageControls
              canvas={canvasInstance}
              activeElementProps={activeElementProps}
              setActiveElementProps={updateActiveProps}
            />
          )}
        </div>}
    </div>
  );
};

export default FabricEditor2;
