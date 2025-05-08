import { fabric } from "fabric";
// import { INITIAL_PATH, svg } from "./Constants/designer-constants";
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

  // addTriangle(options) {
  //   if (!this.canvas) return;
  //   const triangleElement = new fabric.Triangle({
  //     ...options,
  //     strokeUniform: true,
  //     id: getNewID(),
  //   });
  //   this.canvas.add(triangleElement);
  //   return triangleElement;
  // }

  // makeQuadGroup(ObjectsArray) {
  //   if (!this.canvas) return;
  //   const group = new fabric.Group(ObjectsArray);
  //   group.name = "QuadraticArrow";
  //   group.setControlsVisibility({
  //     tl: false,
  //     tr: false,
  //     br: false,
  //     bl: false,
  //     ml: false,
  //     mt: false,
  //     mr: false,
  //     mb: false,
  //     mtr: false,
  //   });
  //   group.name = "QuadraticArrow";
  //   return group;
  // }

  // makeEndTriangle(options, left, top, line1, line2, line3) {
  //   if (!this.canvas) return;
  //   const triangle = new fabric.Triangle({
  //     id: getNewID(),
  //     left: left,
  //     top: top,
  //     strokeUniform: true,
  //     ...options,
  //   });
  //   triangle.line1 = line1;
  //   triangle.line2 = line2;
  //   triangle.line3 = line3;
  //   triangle.angle = this.getAngle(line1, line3);
  //   return triangle;
  // }

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

  // addCircle(options) {
  //   if (!this.canvas) return;
  //   const circleElement = new fabric.Circle({
  //     ...options,
  //     strokeUniform: true,
  //     id: getNewID(),
  //   });
  //   this.canvas.add(circleElement);
  //   return circleElement;
  // }

  // drawQuadratic(options) {
  //   if (!this.canvas) return;
  //   const curve = new fabric.Path(
  //     `M ${INITIAL_PATH.p0}, Q ${INITIAL_PATH.p1} ${INITIAL_PATH.p2}`,
  //     {
  //       ...options,
  //     }
  //   );
  //   return curve;
  // }

  // makeControlPoint(options, left, top) {
  //   if (!this.canvas) return;
  //   const points = new fabric.Path(svg, {
  //     left: left,
  //     top: top,
  //     ...options,
  //   });
  //   return points;
  // }

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

  // addLine(options) {
  //   if (!this.canvas) return;
  //   const lineElement = new fabric.Line(options.points, {
  //     ...options,
  //     id: getNewID(),
  //   });
  //   this.canvas.add(lineElement);
  //   return lineElement;
  // }

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
        console.log(url);
        console.log(containerElem);
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

  // addRect(options, position) {
  //   if (!this.canvas) return;
  //   const _rect = new fabric.Rect({
  //     ...options,
  //     strokeUniform: true,
  //     id: getNewID(),
  //   });
  //   if (position) {
  //     _rect.top = position.top / 2 + 70;
  //     _rect.left = position.left / 2 - 70;
  //   }
  //   this.canvas.add(_rect);
  //   this.canvas.bringToFront(_rect);
  //   return _rect;
  // }

  // async addTextBox(text, options) {
  //   if (!this.canvas) return;
  //   if (options?.fontFamily) {
  //     await loadGoogleFont(options?.fontFamily);
  //   }
  //   const textbox = new fabric.Textbox(text, {
  //     ...options,
  //     strokeUniform: true,
  //     id: getNewID(),
  //   });
  //   return textbox;
  // }

  // addPolygon(points, options) {
  //   if (!this.canvas) return;
  //   const polyElement = new fabric.Polygon(points, {
  //     ...options,
  //     strokeUniform: true,
  //     id: getNewID(),
  //   });
  //   return polyElement;
  // }

  async getSVGFromURL(url, options) {
    const promise = new Promise((resolve, reject) => {
      if (!this.canvas) reject();
      fabric.loadSVGFromURL(url, (objects) => {
        const svg = fabric.util.groupSVGElements(objects, {
          id: getNewID(),
          ...options,
          type: "group",
        });
        this.canvas.add(svg);
        resolve(svg);
      });
    });
    return promise;
  }
}

export default CanvasCore;
