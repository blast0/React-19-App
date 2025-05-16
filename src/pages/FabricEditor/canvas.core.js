import { fabric } from "fabric";
import {
  getNewID,
  addPattern,
  loadGoogleFont,
  scaleElementTofitCanvas,
} from "./helper-functions";
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

  addImgAsPatternFromURL(url, options) {
    return new Promise((resolve) => {
      if (!this.canvas) return;
      const { ...restOptions } = options;
      let canvas = this.canvas;
      let containerElem = null;
      if (restOptions?.containerType === "circle") {
        containerElem = new fabric.Circle({
          radius: restOptions?.height / 2,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          left: restOptions.left
            ? restOptions.left
            : (canvas.width - restOptions?.width) / 2,
          top: restOptions.top
            ? restOptions.top
            : (canvas.height - restOptions?.height) / 2,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      } else if (restOptions?.containerType === "triangle") {
        containerElem = new fabric.Triangle({
          height: restOptions?.height,
          width: restOptions?.width,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          backgroundColor: "rgba(255,255,255,0)",
          left: restOptions.left
            ? restOptions.left
            : (canvas.width - restOptions?.width) / 2,
          top: restOptions.top
            ? restOptions.top
            : (canvas.height - restOptions?.height) / 2,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      } else {
        containerElem = new fabric.Rect({
          height: restOptions?.height,
          width: restOptions?.width,
          name: restOptions?.name,
          stopContainerResize: restOptions?.stopContainerResize,
          imageFit: restOptions?.imageFit,
          rx: 0,
          ry: 0,
          id: getNewID(),
          BorderLock: true,
          fill: "rgba(0 0 0 0)",
          left: restOptions.left ? restOptions.left : 0,
          top: restOptions.top ? restOptions.top : 0,
          stroke: "#000",
          strokeWidth: 0,
          strokeUniform: true,
          URL: url,
        });
      }
      canvas.add(containerElem);
      canvas.setActiveObject(containerElem);
      if (restOptions.sendtoback) {
        containerElem.sendToBack();
      }
      addPattern(url, canvas, () => {
        setTimeout(() => {
          canvas.requestRenderAll();
        }, 100);
        if (options.preselected) {
          containerElem.preselected = options.preselected;
        }
        resolve(containerElem);
      });
    });
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
