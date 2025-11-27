import { fabric } from "fabric";
import { uniqueId } from "lodash";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/custom/spinner";
import {
  EXTRA_ELEMENT_PROPS,
  LINE_PROPS_DEFAULT,
  SHAPES_PROPS_DEFAULT,
} from "./Constants/canvasConstants";
import FontFaceObserver from "fontfaceobserver";
import { CANVAS_CUSTOM_FONTS, FONT_PROPS_DEFAULT } from "./Constants/font";
import { ACTIONS } from "./Constants/actions";

/**
 * generate random id
 * @returns string
 */
export const getNewID = () => {
  return uniqueId();
};

export const CheckPattern = (value, canvas, activeElement) => {
  if (!activeElement.patternSourceCanvas._objects?.[0]) {
    addPattern(activeElement.URL, canvas, (props, img) => {
      let newProps = handlePatternFit(value, canvas, activeElement, img);
      return newProps;
    });
  } else {
    let newProps = handlePatternFit(value, canvas, activeElement);
    return newProps;
  }
};

export const handlePatternFit = (value, canvas, activeElement, image) => {
  let img = activeElement?.patternSourceCanvas?._objects?.[0];
  if (image) {
    img = image;
  }
  if (!img) {
    CheckPattern(value, canvas, activeElement);
  } else {
    img.rotate(0);
    let imgHeight = img.height;
    let imgWidth = img.width;
    let patternHeight = activeElement.patternHeight;
    let ratio = img.height / patternHeight;
    let patternWidth = img.width / ratio;
    let patternLeft = 0;
    let patternTop = 0;
    const scaleX = activeElement.width / imgWidth;
    const scaleY = activeElement.height / imgHeight;
    if (value === "Fit Image") {
      if (scaleX > scaleY) {
        //wider when scaled
        patternHeight = imgHeight * scaleX;
        patternWidth = imgWidth * scaleX;
        patternTop = parseInt((activeElement.height - patternHeight) / 2);
      } else {
        //taller when scaled
        patternHeight = activeElement.height;
        patternWidth = imgWidth * scaleY;
        patternLeft = parseInt((activeElement.width - patternWidth) / 2);
      }
    } else {
      if (scaleX < scaleY) {
        //wider when scaled
        patternHeight = imgHeight * scaleX;
        patternWidth = imgWidth * scaleX;
        patternTop = parseInt((activeElement.height - patternHeight) / 2);
      } else {
        //taller when scaled
        patternHeight = activeElement.height;
        patternWidth = imgWidth * scaleY;
        patternLeft = parseInt((activeElement.width - patternWidth) / 2);
      }
    }
    img.scaleToWidth(patternWidth / fabric.devicePixelRatio);
    activeElement.patternSourceCanvas.setDimensions({
      width: patternWidth,
      height: patternHeight,
    });
    activeElement.patternWidth = patternWidth;
    activeElement.patternHeight = patternHeight;
    activeElement.fill.offsetX = patternLeft;
    activeElement.fill.offsetY = patternTop;
    activeElement.patternLeft = patternLeft;
    activeElement.patternFit = value;
    activeElement.patternTop = patternTop;
    const newProps = {
      patternLeft,
      patternTop,
      patternWidth,
      patternHeight,
      patternFit: value,
      patternActive: true,
    };
    img.rotate(activeElement.patternAngle);
    canvas.renderAll();
    return newProps;
  }
};

export const addPattern = async (url, canvas, cb) => {
  const activeObject = canvas.getActiveObject();
  const imageFit = activeObject?.imageFit ? activeObject.imageFit : "Fit Image";
  if (url === "") {
    activeObject.URL = "";
    activeObject.patternActive = false;
    const _newProps = {
      URL: "",
      patternActive: false,
    };
    cb(_newProps);
  } else {
    Spinner.showSpinner("Adding Background Pattern");
    var img = new Image();
    img.onload = function () {
      fabric.Image.fromURL(
        url,
        async (img) => {
          let patternSourceCanvas = new fabric.StaticCanvas();
          patternSourceCanvas.add(img);
          let patternLeft = 0;
          let patternTop = 0;
          const pattern = new fabric.Pattern({
            source: patternSourceCanvas.getElement(),
            repeat: "no-repeat",
            offsetX: patternLeft,
            offsetY: patternTop,
          });
          activeObject.set({
            fill: pattern,
            objectCaching: false,
            centeredRotation: true,
            patternSourceCanvas,
          });
          activeObject.URL = url;
          activeObject.patternLeft = patternLeft;
          activeObject.patternTop = patternTop;
          activeObject.patternWidth = img.width;
          activeObject.patternHeight = img.height;
          activeObject.patternAngle = 0;
          activeObject.patternActive = true;
          activeObject.patternFit = imageFit;
          const newProps = CheckPattern(imageFit, canvas, activeObject);
          cb(newProps, img);
        },
        { crossOrigin: "Anonymous" }
      );
      canvas.renderAll();
      canvas.requestRenderAll();
      Spinner.hideSpinner();
    };
    img.onerror = function () {
      console.log("img loading failed");
      Spinner.hideSpinner();
      activeObject.patternActive = false;
      const _activeElementProps = {
        patternActive: false,
      };
      cb(_activeElementProps);
    };
    img.src = url;
  }
};

/**
 * generate font dropdown data from global supported fonts
 * @returns array
 */
export const getFrontDropdownData = () => {
  return Object.values(CANVAS_CUSTOM_FONTS)
    .sort()
    .map((fontName) => {
      return {
        name: fontName,
        value: fontName,
      };
    });
};

export const handleFontStyle = (btn, activeElement) => {
  switch (btn) {
    case "bold":
      if (activeElement.fontWeight !== "bold") {
        activeElement.set("fontWeight", "bold");
      } else {
        activeElement.set("fontWeight", "normal");
      }
      break;
    case "italic":
      if (activeElement.fontStyle !== "italic") {
        activeElement.set("fontStyle", "italic");
      } else {
        activeElement.set("fontStyle", "normal");
      }
      break;
    case "strikethrough":
      activeElement.set("linethrough", !activeElement.linethrough);
      break;
    case "underline":
      activeElement.set("underline", !activeElement.underline);
      break;
    default:
  }
};

export const setfontfamily = async (value, canvas) => {
  const activeElement = canvas.getActiveObject();
  // try to load google font
  try {
    Spinner.showSpinner();
    await loadGoogleFont(value);
  } catch (error) {
    console.log("error loading google font ", error);
  } finally {
    activeElement.set("fontFamily", value);
    canvas.requestRenderAll();
    Spinner.hideSpinner();
  }
};

export const makeGradient = (config, gradientText, canvasElement) => {
  const h = canvasElement.height;
  const w = canvasElement.height;
  const { colorStops, type, angle } = config;
  let coords = {};
  let rad = -parseInt(angle, 10) * (Math.PI / 180);
  if (colorStops.length > 1) {
    switch (type) {
      case "linear":
        coords = {
          x1: (Math.round(50 + Math.sin(rad) * 50) * w) / 100,
          y1: (Math.round(50 + Math.cos(rad) * 50) * h) / 100,
          x2: (Math.round(50 + Math.sin(rad + Math.PI) * 50) * w) / 100,
          y2: (Math.round(50 + Math.cos(rad + Math.PI) * 50) * h) / 100,
        };
        break;
      case "radial":
        coords = {
          r1: 0,
          r2: w,
          x1: w / 2,
          y1: h / 2,
          x2: w / 2,
          y2: h / 2,
        };
        break;
      default:
        break;
    }
  }
  let grad = "";
  if (colorStops.length === 1) {
    //do magic
    canvasElement.fillColor = colorStops[0].color;
    canvasElement.fillGradient = null;
    grad = colorStops[0].color;
  } else {
    grad = {
      type,
      coords,
      colorStops: colorStops.map((stop) => {
        return {
          color: stop.color,
          offset: stop.offset / 100,
        };
      }),
    };
    canvasElement.fillColor = null;
    canvasElement.fillGradient = gradientText;
    canvasElement.gradient = grad;
  }
  return grad;
};

export const scaleElementTofitCanvas = (
  imageFit,
  canvasHeight,
  canvasWidth,
  elem
) => {
  const xscale = canvasWidth / elem.width;
  const yscale = canvasHeight / elem.height;

  if (
    canvasWidth !== elem.width ||
    canvasHeight !== elem.height ||
    elem.scaleX !== 1 ||
    elem.scaleY !== 1
  ) {
    if (imageFit === "Show full Image" || imageFit === "Show full Svg") {
      if (xscale > yscale) {
        elem.scaleX = elem.scaleY = yscale;
        const scaledleft = canvasWidth - elem.width * yscale;
        elem.left = scaledleft / 2;
        elem.top = 0;
      } else {
        elem.scaleX = elem.scaleY = xscale;
        const scaledtop = canvasHeight - elem.height * xscale;
        elem.top = scaledtop / 2;
        elem.left = 0;
      }
      elem.imageFit = imageFit;
    } else if (
      imageFit === "Fit Image to boundary" ||
      imageFit === "Fit Svg to boundary"
    ) {
      if (xscale < yscale) {
        const scaledleft = canvasWidth - elem.width * yscale;
        elem.left = scaledleft / 2;
        elem.scaleX = elem.scaleY = yscale;
        elem.top = 0;
      } else {
        const scaledtop = canvasHeight - elem.height * xscale;
        elem.top = scaledtop / 2;
        elem.scaleX = elem.scaleY = xscale;
        elem.left = 0;
      }
      elem.imageFit = imageFit;
    }
  } else {
    const left = (canvasWidth - elem.width) / 2;
    elem.left = left;
    const top = (canvasHeight - elem.height) / 2;
    elem.top = top;
  }
};

export const loadGoogleFont = (fontName) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      Spinner.showSpinner(`Loading Font: ${fontName}`);
      var myfont = new FontFaceObserver(fontName);
      const res = await myfont.load();
      Spinner.hideSpinner();
      resolve(res);
    } catch (err) {
      console.log("font loading failed ", err);
      Spinner.hideSpinner();
      resolve(err);
    }
  });
};

export const handleOutsideClick = (event, self) => {
  console.log("handleOutsideClick");
  const canvas = Object.values(self.state.canvases)[0];
  if (!event.target.className.includes("canvas")) {
    canvas.discardActiveObject().renderAll();
    self.setState({
      showStyleEditor: false,
      selectedElementName: "Please select",
      selectedElementId: null,
    });
  }
};

export const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const handleDrop = (images, cb = () => {}) => {
  // let imagesCount = countElementTypes("Image", self);
  // let svgCount = countElementTypes("Svg", self);
  const elements = [];
  images.forEach(async (image, index) => {
    console.log(image);

    let _width = null;
    let _height = null;
    const name = image.name;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (reader.result.includes("svg+xml")) {
        ({ _width, _height } = svgSize(name, _width, _height));
        const svgElementSchema = {
          id: getNewID(),
          type: "Svg",
          url: reader.result,
          center: true,
          name: "Svg ", // + svgCount,
          _height: _height > 0 ? _height : null,
          _width: _width > 0 ? _width : null,
          imageFit: "Show full Svg", //contain= Show full Svg, cover=Fit Svg to boundary
        };
        // svgCount++;
        elements.push(svgElementSchema);
        if (index + 1 === images.length) {
          cb(elements);
        }
      } else if (reader.result.includes("data:image")) {
        let img = new Image();
        img.src = reader.result;
        img.onload = function () {
          const imgElementSchema = {
            id: getNewID(),
            type: "Image",
            name: "Image ", //  + imagesCount,
            left: 0,
            top: 0,
            preselected: true,
            sendtoback: false,
            url: reader.result,
            imageFit: "Show full Image", //contain= Show full Image, cover=Fit Image to boundary
            BorderX: 5,
            BorderY: 5,
          };
          // imagesCount++;
              console.log(imgElementSchema);
          elements.push(imgElementSchema);
          cb(elements);
          if (index + 1 === images.length) {
          }
        };
      }
    });
    reader.readAsDataURL(image);
  });
};

export const onSelectFile = (e) => {
  console.log("onSelectFile");
  if (e.target.files && e.target.files.length > 0) {
    const files = [];
    Object.keys(e.target.files).forEach((key) => {
      files.push(e.target.files[key]);
    });
    handleDrop(files);
  }
  //clear filereader to detect same file again if not changed on mutliple attempts
  e.target.value = "";
};

export const createJSON = (self, canvas) => {
  const groupPresent = isGroupPresent(canvas);
  if (groupPresent) {
    toast.error("Error", `Group object is not allowed to export`);
    return;
  }
  const temp = canvas.toJSON(EXTRA_ELEMENT_PROPS);
  return temp;
};

export const isGroupPresent = (canvas) => {
  const objects = canvas.getObjects();
  for (const obj of objects) {
    if (obj.type === "Quadratic") {
      return true;
    }
  }
  return false;
};

export const onAddImageFromFile = (e, self) => {
  console.log(e, self)
  const { canvas, canvasHeight, canvasWidth } = self.state;
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    let img = new Image();
    let fileName = "";
    let _width = null;
    let _height = null;
    const files = [];
    Object.keys(e.target.files).forEach((key) => {
      fileName = e.target.files[key].name;
      files.push(e.target.files[key]);
    });
    ({ _width, _height } = svgSize(fileName, _width, _height));

    reader.addEventListener("load", () => {
      img.src = reader.result;
      img.onload = function () {
        canvas.clear();
        canvas.backgroundColor = "#ffffff";
        canvas.renderAll();
        const styles = window.getComputedStyle(self.canvasContainer?.current);
        const widthLimit = parseInt(styles?.width) - 20;
        const heightLimit = parseInt(styles?.height) - 20;
        const imgRatio = img.width / img.height;
        console.log(imgRatio);
        if (
          img.width > parseInt(styles?.width) - 20 ||
          img.height > parseInt(styles?.height) - 20
        ) {
          console.log("here");
          if (imgRatio > widthLimit / heightLimit) {
            //wider image
            if (img.width > widthLimit) {
              if (widthLimit / imgRatio > heightLimit) {
                self.setState(
                  {
                    canvasHeight: parseInt(heightLimit * imgRatio),
                  },
                  () => {
                    handleDrop(files);
                  }
                );
              } else {
                self.setState(
                  {
                    canvasWidth: widthLimit,
                    canvasHeight: parseInt(widthLimit / imgRatio),
                  },
                  () => {
                    handleDrop(files);
                  }
                );
              }
            } else if (img.width > canvasWidth) {
              self.setState(
                {
                  canvasWidth: img.width,
                  canvasHeight: parseInt(img.width / imgRatio),
                },
                () => {
                  handleDrop(files);
                }
              );
            }
          } else {
            //longer image
            if (img.height > heightLimit) {
              self.setState(
                {
                  canvasWidth: parseInt(heightLimit * imgRatio),
                  canvasHeight: heightLimit,
                },
                () => {
                  handleDrop(files);
                }
              );
            } else if (img.height > canvasHeight) {
              self.setState(
                {
                  canvasWidth: parseInt(img.height * imgRatio),
                  canvasHeight: img.height,
                },
                () => {
                  handleDrop(files);
                }
              );
            }
          }
        } else {
          console.log("here", files);
          self.setState(
            {
              canvasWidth: _width ? _width : parseInt(img.height * imgRatio),
              canvasHeight: _height ? _height : img.height,
            },
            () => {
              handleDrop(files);
            }
          );
        }
      };
    });
    reader.readAsDataURL(e.target.files[0]);
  }
  //clear filereader to detect same file again if not changed on mutliple attempts
  e.target.value = "";
};

function svgSize(name) {
  const match = name.match(/\b(\d{1,4})x(\d{1,4})\b/);
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    return {
      _width: width > 2000 ? 2000 : width,
      _height: height > 2000 ? 2000 : height,
    };
  } else {
    return { _width: null, _height: null };
  }
}

// UPDATE PAGE DIMENSIONS
export const resizePage = (self, cb = () => {}) => {
  const { pages, canvasHeight, canvasWidth } = self.state;
  const page = pages[0];
  const newPage = {
    ...page,
    style: {
      ...page.style,
      height: canvasHeight,
      width: canvasWidth,
    },
  };
  self.setState(
    {
      // to add page
      pages: [newPage],
      activePageID: newPage.id,
    },
    () => {
      cb();
    }
  );
};

export const handleShadow = (value, canvas) => {
  const activeObject = canvas.getActiveObject();
  const shadowProperty = value;
  const values = shadowProperty.split(" ");
  const color = values[0];
  const X_offset = parseInt(values[1], 10);
  const Y_offset = parseInt(values[2], 10);
  const blur = parseInt(values[3], 10);
  const shadow = new fabric.Shadow({
    color: color,
    blur: blur,
    offsetX: X_offset,
    offsetY: Y_offset,
  });
  activeObject.boxShadow = value;
  activeObject.set("shadow", shadow);
  canvas.renderAll();
};

export const countElementTypes = (type, self) => {
  const { canvas } = self.state;
  let count = 1;
  canvas.getObjects().forEach((item) => {
    if (item.type === type) {
      count++;
    }
  });
  return count;
};

export const addText = (self) => {
  let count = countElementTypes("i-text", self);
  const svgElementSchema = {
    ...Object.assign({}, FONT_PROPS_DEFAULT),
    id: getNewID(),
    value: "Text",
    type: "i-text",
    name: "Text" + count,
  };
  self.addElements([svgElementSchema]);
};

export const addTriangle = (self) => {
  let count = countElementTypes("triangle", self);
  const triangleElementSchema = {
    id: getNewID(),
    type: "triangle",
    name: "Triangle " + count,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  self.addElements([triangleElementSchema]);
};

export const addRectangle = (height, width, self) => {
  const { canvasHeight, canvasWidth } = self.state;
  let count = countElementTypes("rect", self);
  const rectangleElementSchema = {
    id: getNewID(),
    type: "rect",
    name: "Rectangle " + count,
    height: height ? height : canvasHeight / 3,
    width: width ? width : canvasWidth / 3,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  self.addElements([rectangleElementSchema]);
};

export const resetPage = (self) => {
  const { canvas } = self.state;
  canvas.clear();
  canvas.backgroundColor = "#ffffff";
  canvas.renderAll();
  self.setState({
    canvasWidth: 1200,
    canvasHeight: 640,
    canvasBgColor: "#ffffff",
    activeElementProps: null,
    // showStyleEditor: false,
    // selectedElementName: "Please select",
  });
};

export const deleteSelection = (self) => {
  const { canvas } = self.state;
  const activeObjects = canvas.getActiveObjects();
  canvas.remove(...activeObjects);
  canvas.discardActiveObject();
};

export const addCircle = (self) => {
  let count = countElementTypes("circle", self);
  const circleElementSchema = {
    id: getNewID(),
    type: "circle",
    name: "Circle " + count,
    radius: 50,
    selectable: true,
    ...Object.assign({}, SHAPES_PROPS_DEFAULT),
  };
  self.addElements([circleElementSchema]);
};

export const addLine = (type, self) => {
  let count = countElementTypes("line", self);
  const lineElementSchema = {
    id: getNewID(),
    padding: 10,
    type: "line",
    name: "Line " + count,
    points: [50, 100, 200, 100],
    strokeDashArray: type === ACTIONS.ADD_DASHED_LINE ? [5, 5] : [],
    selectable: true,
    ...Object.assign({}, LINE_PROPS_DEFAULT),
  };
  self.addElements([lineElementSchema]);
};

export const handleRightPanelUpdates = (action, data, self) => {
  console.log(action, data, self);

  const { canvas } = self.state;
  const { canvasHeight, canvasWidth, loadingImage } = self.state;
  const activeElement = canvas.getActiveObject();
  switch (action) {
    case ACTIONS.ADD_TEXT:
      addText(self);
      break;
    // case ACTIONS.CHANGE_PAGE_BACKGROUND:
    //   changePageBackGround(data, self);
    //   break;
    // case ACTIONS.ELEMENT_NAME:
    //   handleNameElement(data.target.value, self);
    //   break;
    // case ACTIONS.CHANGE_PAGE_DIMENSIONS:
    //   dimensionChangeHandler(data.name, data.val, self);
    //   break;
    // case ACTIONS.CLEAR_PAGE:
    //   resetPage(self);
    //   break;
    case ACTIONS.CLEAR_SELECTED_ITEM:
      deleteSelection(self);
      break;
    case ACTIONS.UPLOAD_IMAGE:
      self.imageInputRef.current.click();
      break;
    case ACTIONS.UPLOAD_SVG:
      self.svgInputRef.current.click();
      break;
    // case ACTIONS.DELETE_SELECTION:
    //   deleteSelection(self);
    //   break;
    case ACTIONS.REDO_ACTION:
      canvas.redo();
      break;
    case ACTIONS.UNDO_ACTION:
      canvas.undo();
      break;
    // case ACTIONS.UPDATE_ACTIVE_ELEMENT:
    //   updateActiveElement(data.id, data.name, self);
    //   break;
    case ACTIONS.ADD_TRIANGLE:
      addTriangle(self);
      break;
    case ACTIONS.ADD_RECTANGLE:
      addRectangle(null, null, self);
      break;
    case ACTIONS.ADD_CIRCLE:
      addCircle(self);
      break;
    case ACTIONS.ADD_LINE:
      addLine(ACTIONS.ADD_LINE, self);
      break;
    // case ACTIONS.ADD_DASHED_LINE:
    //   addLine(ACTIONS.ADD_DASHED_LINE, self);
    //   break;
    case ACTIONS.RAW_DATA:
      self.jsonRef.current.click();
      break;
    case ACTIONS.IMAGE_DATA:
      self.imagetoCanvas.current.click();
      break;
    case ACTIONS.ADD_PATTERN:
      {
        activeElement.URL = data;
        const _activeElementProps = {
          ...self.state.activeElementProps,
          URL: data,
        };
        self.setState({ activeElementProps: _activeElementProps });
        if (!loadingImage) {
          addPattern(data, canvas, (newProps) => {
            const _activeElementProps = {
              ...self.state.activeElementProps,
              ...newProps,
            };
            self.setState(
              { activeElementProps: _activeElementProps, loadingImage: false },
              () => {
                canvas.requestRenderAll();
              }
            );
          });
        }
      }
      break;
    // case ACTIONS.CHANGE_PATTERN_SIZE:
    //   handlePatternSize(data.width, data.height, self);
    //   break;
    // case ACTIONS.CHANGE_PATTERN_POSITION:
    //   handlePatternPosition(data.left, data.top, data.angle, self);
    //   break;
    case ACTIONS.MAKE_BLANK:
      resetPage(self);
      canvas.clearHistory();
      break;
    default:
      console.log("unhandled-action", action);
      break;
  }
};
