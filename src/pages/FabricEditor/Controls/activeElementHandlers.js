import { ARROW_HEAD } from "../Constants/designer-constants";
import { ACTIONS } from "../Constants/actions";
// import { getDataUriFromBlobData, loadGoogleFont } from "../../../../helper";
import { Spinner } from "@/components/ui/custom/spinner";
import { loadGoogleFont } from "../helper-functions";
import { CANVAS_CUSTOM_FONTS } from "../Constants/font";

export const handleSelectedTool = (selectedTool, activeElement, self) => {
  if (!selectedTool) return;
  self.props.onChange(ACTIONS.CHANGE_ACTIVE_ELEMENT_PROPS, {
    ...self.props.activeElementProps,
    selectedTool,
  });
  activeElement.selectedTool = selectedTool;
  activeElement.states = {};
  activeElement.randomShapePath = "";
};

export const handleSvgElem = async (svg, randomShapePath, states, self) => {
  if (!svg) return;
  const { canvas } = self.props;
  const activeElement = canvas.getActiveObject();
  var svgBlob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8",
  });
  const imgUri = await getDataUriFromBlobData(
    svgBlob,
    { height: activeElement?.height, width: activeElement?.width },
    "png"
  );
  if (imgUri !== activeElement.URL && imgUri) {
    activeElement.setSrc(imgUri, () => {
      canvas.requestRenderAll();
    });
    activeElement.randomShapePath = randomShapePath;
    activeElement.states = states;
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

export const getArrowHeadData = () => {
  return Object.values(ARROW_HEAD).map((arrowOptions) => {
    return {
      name: arrowOptions,
      value: arrowOptions,
    };
  });
};

export const tabStopchangeHandler = (value, colorIndex, self) => {
  const { activeElementProps } = self.props;
  const colors = activeElementProps.colors.map((color, index) => {
    if (index === colorIndex) {
      return value;
    }
    return color;
  });
  updateActiveElement({ colors }, self);
};

export const tabStopchangeHandlere = (value, colorIndex, self) => {
  const { activeElementProps } = self.props;
  const strokeColors = activeElementProps.strokeColors.map((color, index) => {
    if (index === colorIndex) {
      return value;
    }
    return color;
  });
  updateActiveElement({ strokeColors }, self);
};

export const updateActiveElement = (collection, self) => {
  const _activeElementProps = {
    ...self.props.activeElementProps,
    ...collection,
  };
  self.props.onActiveElementPropsChange(_activeElementProps);
};

export const handlePatternSize = (width, height, self) => {
  self.props.onChange(ACTIONS.CHANGE_PATTERN_SIZE, { width, height });
};

export const handlePatternPosition = (left, top, angle, self) => {
  self.props.onChange(ACTIONS.CHANGE_PATTERN_POSITION, { left, top, angle });
};

export const handleShadow = (value, self, fabric) => {
  const { canvas } = self.props;
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

export const createRoundedRect = (rx, ry, self, fabric) => {
  const { canvas } = self.props;
  const activeObject = canvas.getActiveObject();
  const rect = new fabric.Rect({
    width: activeObject.width,
    height: activeObject.height,
    rx: rx,
    ry: ry,
    left: -activeObject.width / 2,
    top: -activeObject.height / 2,
  });
  activeObject.set("clipPath", rect);
};

export const handleRectBorderRadius = (rx, ry, self) => {
  const { canvas } = self.props;
  updateActiveElement({ ry, rx }, self);
  canvas.requestRenderAll();
};

// UPDATE CONFIGURATOR DATA ONCHANGE
export const updateStyle = (data, self) => {
  const { activeElementProps } = self.props;
  let keys = Object.keys(data);
  keys.forEach((key) => {
    let index = parseInt(key.split(" ")[1]);
    if (key.includes("selectElementColor"))
      if (data[key]["value"] !== activeElementProps.colors[index])
        tabStopchangeHandler(data[key]["value"], index, self);
    if (key.includes("selectStokeColor"))
      if (data[key]["value"] !== activeElementProps.strokeColors[index])
        tabStopchangeHandlere(data[key]["value"], index, self);
  });
};

// CREATE DATA FOR CONFIGURATOR CONTROLS
export const createConfiguratorData = (self) => {
  const { activeElementProps } = self.props;
  const activeElementColors = {};
  //CREATE DATA FOR ACTIVE ELEMENT COLORS
  const colors = activeElementProps.colors?.map((color, index) => {
    return {
      ["selectElementColor " + index]: {
        label: "Color" + (index + 1),
        type: "color",
        value: color,
        showInPopup: true,
        containerClass: "sm",
      },
    };
  });
  // ADD SELECTED ELEMENT COLORS TO CONFIGURATOR DATA
  colors.forEach((item) => {
    Object.assign(activeElementColors, item);
  });

  return activeElementColors;
};
// CREATE DATA FOR CONFIGURATOR CONTROLS
export const getStrokeColorControls = (self) => {
  const { activeElementProps } = self.props;
  const activeStrokeColors = {};
  //CREATE DATA FOR ACTIVE ELEMENT COLORS
  const strokeColors = activeElementProps?.strokeColors?.map((color, index) => {
    return {
      ["selectStokeColor " + index]: {
        label: "StrokeColor" + (index + 1),
        type: "color",
        value: color,
        showInPopup: true,
        containerClass: "sm",
      },
    };
  });
  // ADD SELECTED ELEMENT COLORS TO CONFIGURATOR DATA
  if (strokeColors?.length)
    strokeColors.forEach((item, index) => {
      if (item["selectStokeColor " + index].value)
        Object.assign(activeStrokeColors, item);
    });
  return activeStrokeColors;
};

// convert gradient component value to fabric gradient configuration
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

// add traingle on line edge to make it an arrow, left, right or both sided
export const setArrowHead = (value, self) => {
  let arrowStyle;
  const { onActiveElementPropsChange, activeElementProps } = self.props;
  switch (value) {
    case ARROW_HEAD.RIGHT_ARROW:
      arrowStyle = {
        ...activeElementProps,
        arrowStyle: ARROW_HEAD.RIGHT_ARROW,
      };
      onActiveElementPropsChange(arrowStyle);
      break;
    case ARROW_HEAD.LEFT_ARROW:
      arrowStyle = {
        ...activeElementProps,
        arrowStyle: ARROW_HEAD.LEFT_ARROW,
      };
      onActiveElementPropsChange(arrowStyle);
      break;
    case ARROW_HEAD.DOUBLE_SIDED:
      arrowStyle = {
        ...activeElementProps,
        arrowStyle: ARROW_HEAD.DOUBLE_SIDED,
      };
      onActiveElementPropsChange(arrowStyle);
      break;
    default:
      console.log("unhandled-action arrow type");
      break;
  }
};

export const setBubbleFontFamily = async (value, activeElement, canvas) => {
  try {
    Spinner.showSpinner();
    await loadGoogleFont(value);
  } catch (error) {
    console.log("error loading google font ", error);
  } finally {
    activeElement._objects[1].set({
      fontFamily: value,
    });
    canvas.renderAll();
    Spinner.hideSpinner();
  }
};

// set font family of selected text
export const setfontfamily = async (value, self) => {
  const { canvas, activeElementProps, onActiveElementPropsChange } = self.props;
  const activeElement = canvas.getActiveObject();
  const _activeElementProps = {
    ...activeElementProps,
    fontFamily: value,
  };
  // try to load google font
  try {
    Spinner.showSpinner();
    await loadGoogleFont(value);
  } catch (error) {
    console.log("error loading google font ", error);
  } finally {
    activeElement.set("fontFamily", value);
    onActiveElementPropsChange(_activeElementProps);
    canvas.requestRenderAll();
    Spinner.hideSpinner();
  }
};

export const handleFontStyle = (btn, activeElement, canvas) => {
  switch (btn) {
    case "bold":
      if (activeElement.fontWeight !== "bold") {
        activeElement.set("fontWeight", "bold");
        canvas.renderAll();
      } else {
        activeElement.set("fontWeight", "normal");
        canvas.renderAll();
      }
      break;
    case "italic":
      if (activeElement.fontStyle !== "italic") {
        activeElement.set("fontStyle", "italic");
        canvas.renderAll();
      } else {
        activeElement.set("fontStyle", "normal");
        canvas.renderAll();
      }
      break;
    case "strikethrough":
      activeElement.set("linethrough", !activeElement.linethrough);
      canvas.renderAll();
      break;
    case "underline":
      activeElement.set("underline", !activeElement.underline);
      canvas.renderAll();
      break;
    default:
  }
};
