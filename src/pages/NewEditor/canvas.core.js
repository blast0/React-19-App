import { fabric } from "fabric";
import {
  getNewID,
  addPattern,
  loadGoogleFont,
  scaleElementTofitCanvas,
} from "./helper";
import { Spinner } from "@/components/ui/custom/spinner";

class CanvasCore {
  constructor() {
    this.canvas = null;
  }

  createCanvas(cid, cProps) {
    this.canvas = new fabric.Canvas(`canvas-${cid}`, {
      ...cProps,
      preserveObjectStacking: true,
      backgroundColor: "#ffffff",
    });
    return this.canvas;
  }

  async _init(config) {
    const { canvasId, ...canvasProps } = config;
    const _canvas = this.createCanvas(canvasId, canvasProps);
    return _canvas;
  }

  getRef() {
    return this.canvas;
  }

  getJSON() {
    return JSON.stringify(this.canvas);
  }

  async getIText(text, options) {
    fabric.charWidthsCache = {};
    if (!this.canvas) {
      console.error("Canvas not initailized");
      return;
    }
    const textElement = new fabric.IText(text, {
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    if (!options?.fontFamily) return textElement;
    try {
      Spinner.showSpinner(`Loading Font: ${options?.fontFamily}`);
      await loadGoogleFont(options?.fontFamily);
      Spinner.hideSpinner();
    } catch (error) {
      console.error("error loading google font ", error);
      Spinner.hideSpinner();
    }
    return textElement;
  }

  getTriangle(options) {
    if (!this.canvas) {
      console.error("Canvas not initailized");
      return;
    }
    const triangleElement = new fabric.Triangle({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return triangleElement;
  }

  getCircle(options) {
    if (!this.canvas) {
      console.error("Canvas not initailized");
      return;
    }
    const circleElement = new fabric.Circle({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return circleElement;
  }

  getLine(options) {
    if (!this.canvas) {
      console.error("Canvas not initailized");
      return;
    }
    const lineElement = new fabric.Line(options.points, {
      ...options,
      id: getNewID(),
    });
    return lineElement;
  }

  addImgFromURL(url, options) {
    return new Promise((resolve) => {
      if (!this.canvas) return;
      const { ...restOptions } = options;
      let canvas = this.canvas;
      let img = new Image();
      let imageFit = options?.imageFit;
      img.crossOrigin = "anonymous";
      img.src = url;
      Spinner.showSpinner("Loading Image");
      img.onload = function () {
        Spinner.hideSpinner();
        let image = new fabric.Image(img, {
          ...restOptions,
          id: options?.id ? options.id : getNewID(),
          crossOrigin: "anonymous",
          URL: url,
          isUrlValid: true,
          strokeUniform: true,
        });
        if (imageFit) {
          scaleElementTofitCanvas(imageFit, canvas.height, canvas.width, image);
        }
        canvas.add(image);
        if (restOptions.sendtoback) {
          image.sendToBack();
        }
        if (options.preselected) {
          image.preselected = options.preselected;
        }
        resolve(image);
      };
    });
  }

  async addImgAsPatternFromURL(url, options) {
    if (!this.canvas) return;

    const { ...restOptions } = options;
    const canvas = this.canvas;
    let containerElem = null;

    const commonProps = {
      name: restOptions?.name,
      stopContainerResize: restOptions?.stopContainerResize,
      imageFit: restOptions?.imageFit,
      id: getNewID(),
      BorderLock: true,
      fill: "rgba(0 0 0 0)",
      stroke: "#000",
      strokeWidth: 0,
      strokeUniform: true,
      URL: url,
      left: restOptions.left ?? (canvas.width - restOptions?.width) / 2,
      top: restOptions.top ?? (canvas.height - restOptions?.height) / 2,
    };

    if (restOptions?.containerType === "circle") {
      containerElem = new fabric.Circle({
        ...commonProps,
        radius: restOptions?.height / 2,
      });
    } else if (restOptions?.containerType === "triangle") {
      containerElem = new fabric.Triangle({
        ...commonProps,
        height: restOptions?.height,
        width: restOptions?.width,
        backgroundColor: "rgba(255,255,255,0)",
      });
    } else {
      containerElem = new fabric.Rect({
        ...commonProps,
        height: restOptions?.height,
        width: restOptions?.width,
        rx: 0,
        ry: 0,
        left: restOptions.left ?? 0,
        top: restOptions.top ?? 0,
      });
    }

    canvas.add(containerElem);
    canvas.setActiveObject(containerElem);

    if (restOptions.sendtoback) {
      containerElem.sendToBack();
    }

    await new Promise((resolve) => {
      addPattern(url, canvas, () => {
        setTimeout(() => {
          canvas.requestRenderAll();
        }, 100);
        resolve();
      });
    });

    if (options.preselected) {
      containerElem.preselected = options.preselected;
    }

    return containerElem;
  }

  async getSvgFromString(elem) {
    const loadSVGFromStringAsync = (svgStr) => {
      return new Promise((resolve, reject) => {
        fabric.loadSVGFromString(svgStr, (objects, options) => {
          if (objects && options) {
            resolve({ objects, options });
          } else {
            reject(new Error("Failed to load SVG from string"));
          }
        });
      });
    };

    try {
      const { objects, options } = await loadSVGFromStringAsync(elem.svgStr);
      const loadedObject = fabric.util.groupSVGElements(objects, options);
      loadedObject.setCoords();
      loadedObject.id = getNewID();
      loadedObject.name = elem.name;
      loadedObject.subType = elem.subType;
      loadedObject.top = elem.top;
      loadedObject.left = elem.left;
      loadedObject.scaleY = elem.height / loadedObject.height;
      loadedObject.scaleX = elem.width / loadedObject.width;
      return loadedObject;
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  }

  getRect(options) {
    if (!this.canvas) {
      console.error("Canvas not initailized");
      return;
    }
    const _rect = new fabric.Rect({
      ...options,
      strokeUniform: true,
      id: getNewID(),
    });
    return _rect;
  }
}

export default CanvasCore;
