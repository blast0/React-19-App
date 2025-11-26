import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { fabric } from "fabric";
import CanvasCore from "./canvas.core";
// STYLE
import "./googlefonts.css";
import { getNewID } from "../FabricEditor/helper-functions";
import {
  handleDrop,
  handleOutsideClick,
  handleRightPanelUpdates,
  onAddImageFromFile,
} from "./helper";
import { ACCEPTED_FILES, DEFAULT_TEMPLATE } from "./Constants/canvasConstants";
import CanvasControls from "./canvasControls";
import { DeleteIcon } from "./designer-icons";
import TextControls from "./Controls/textControls";
import RectangleControls from "./Controls/rectControls";
import TriangleControls from "./Controls/triangleControls";
import "./fabric-history";

class FabricEditor2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasId: getNewID(),
      canvas: null,
      canvasWidth: 1200,
      canvasHeight: 640,
      canvasBgColor: "#ffffff",
      activeElementProps: null,
    };
    this.canvasContainer = React.createRef();
    this.jsonRef = React.createRef();
    this.imagetoCanvasRef = React.createRef(null);
    this.svgInputRef = React.createRef();
    this.dropzoneRef = React.createRef();
    this._core = null;
  }

  async initCanvas() {
    const { canvasId, canvasWidth, canvasHeight, canvasBgColor } = this.state;
    this._core = new CanvasCore();
    await this._core._init({
      canvasId,
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: canvasBgColor,
    });
    const _canvas = this._core.getRef();
    this.setState({ canvas: _canvas }, async () => {
      try {
        await this.addElements(DEFAULT_TEMPLATE.elements);
        _canvas.clearHistory();
      } catch (error) {
        console.log(error);
      }
    });
    this.canvasContainer.current.addEventListener("click", (e) => {
      if (!e.target.className.includes("canvas")) {
        console.log("Clicked OutSide canvasContainer");
      }
    });

    document.addEventListener("keydown", (e) =>
      this.keydownListener(e, _canvas)
    );

    _canvas.on("selection:created", (e) => {
      this.setupControls(e, _canvas);
      this.setActiveElementProps();
    });

    _canvas.on("selection:updated", (e) => {
      this.setupControls(e, _canvas);
      this.setActiveElementProps();
    });

    _canvas.on("selection:cleared", () => {
      this.setState({
        activeElementProps: null,
      });
    });
  }

  keydownListener = async (event, _canvas) => {
    console.log("AD");
    // const { isCanvasActive } = this.props;
    const key = event.key;
    const activeObject = _canvas.getActiveObject();
    // if (!isCanvasActive) return;
    if (key === "Delete") {
      if (!activeObject) return;
      if (activeObject.type === "i-text" && activeObject.isEditing) {
        return;
      }
      if (activeObject.type === "textbox" && activeObject.isEditing) {
        return;
      }
      // if (isCanvasActive)
      this.deleteObject();
    }

    //ctrl+z key press
    if (event.keyCode === 90 && event.ctrlKey) {
      await _canvas.undo();
    }
    //ctrl+y key press
    if (event.keyCode === 89 && event.ctrlKey) {
      await _canvas.redo();
    }
    //ctrl+a keypress
    if (event.keyCode === 65 && event.ctrlKey) {
      this.handleSpeechPolyRegroup(_canvas);
      _canvas.discardActiveObject();
      var sel = new fabric.ActiveSelection(_canvas.getObjects(), {
        canvas: _canvas,
      });
      _canvas.setActiveObject(sel);
      _canvas.requestRenderAll();
      event.preventDefault();
    }
    const activeItem = _canvas.getActiveObject();
    if (activeItem) {
      //left key
      if (event.keyCode === 37) {
        activeItem.left -= 1;
        _canvas.requestRenderAll();
      }
      //right key
      if (event.keyCode === 39) {
        activeItem.left += 1;
        _canvas.requestRenderAll();
      }
      //up key
      if (event.keyCode === 38) {
        activeItem.top -= 1;
        _canvas.requestRenderAll();
      }
      //down key
      if (event.keyCode === 40) {
        activeItem.top += 1;
        _canvas.requestRenderAll();
      }
    }
  };

  renderIcon = (icon) => {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  };

  setupControls(e, canvas) {
    // this.props.onElementsRendered();
    if (e.selected?.[0]?.getBoundingRect()) {
      let left = e.selected[0].getBoundingRect().left;
      let width = e.selected[0].getBoundingRect().width;
      let top = e.selected[0].getBoundingRect().top;
      if (canvas.getActiveObject().type === "activeSelection") {
        left = canvas.getActiveObject().getBoundingRect().left;
        width = canvas.getActiveObject().getBoundingRect().width;
        top = canvas.getActiveObject().getBoundingRect().top;
      }
      const { canvasWidth, canvasHeight } = this.state;
      let leftOffset = left + width + 30 > canvasWidth ? -16 : 16;
      let topOffset = top - 30 < 0 ? 16 : -16;
      if (left + width > canvasWidth) {
        leftOffset = canvasWidth - left - width - 20;
      }
      if (left + width < 0) {
        leftOffset = 0 - left - width + 20;
      }
      if (top < 0) {
        topOffset = 0 - top + 20;
      }
      if (top > canvasHeight) {
        topOffset = canvasHeight - top - 20;
      }
      this.setupCustomControls(leftOffset, topOffset);
    }
  }

  setupCustomControls = (leftOffset, topOffset) => {
    const deleteImg = document.createElement("img");
    deleteImg.src = DeleteIcon;
    // Custom delete control for fabric.Object prototype.
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: topOffset,
      offsetX: leftOffset,
      cursorStyle: "pointer",
      mouseUpHandler: this.deleteObject,
      render: this.renderIcon(deleteImg),
      cornerSize: 24,
      sizeX: 24,
      sizeY: 24,
      withConnection: true,
    });
  };

  async addElements(elements) {
    const { canvas } = this.state;
    for (const elem of elements) {
      switch (elem.type) {
        case "i-text":
          {
            const textElement = await this._core.getIText(elem.value, elem);
            canvas.add(textElement);
          }
          break;
        case "Svg":
          {
            const svgElement = await this._core.getSVGFromURL(elem.url, elem);
            canvas.add(svgElement);
          }
          break;
        case "svg":
          {
            const svgElement = await this._core.getSvgFromString(elem);
            canvas.add(svgElement);
          }
          break;
        case "triangle":
          {
            const triangleElement = this._core.getTriangle(elem);
            canvas.add(triangleElement);
          }
          break;
        case "circle":
          {
            const circleElement = this._core.getCircle(elem);
            canvas.add(circleElement);
          }
          break;
        case "line":
          {
            const lineElement = this._core.getLine(elem);
            canvas.add(lineElement);
          }
          break;
        case "rect":
          {
            const rectElement = this._core.getRect(elem);
            canvas.add(rectElement);
          }
          break;
        case "Image":
          {
            await this._core.addImgAsPatternFromURL(elem.url, elem);
            canvas.requestRenderAll();
          }
          break;
        case "Pattern":
          {
            await this._core.addImgAsPatternFromURL(elem.url, elem);
            canvas.requestRenderAll();
            this.setActiveElementProps();
          }
          break;
        default:
          console.log("unknown element type");
          break;
      }
    }
    const activeElem = canvas.getObjects().find((item) => {
      return item.preselected === true;
    });
    return activeElem;
  }

  componentDidMount() {
    this.initCanvas();
  }

  componentWillUnmount() {
    this.canvasContainer.current.removeEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
  }

  setActiveElementProps() {
    const editableProps = {};
    const { canvas } = this.state;
    const selected = canvas.getActiveObjects();
    if (!selected.length) return null;
    if (selected.length > 1) {
      console.log("group");
    } else {
      const element = selected[0];
      const filled = element.fill;
      const patternFilled = typeof filled !== "string";
      console.log(element.patternActive);
      if (element.patternActive) {
        editableProps.URL = element.URL;
        editableProps.patternLeft = element.patternLeft;
        editableProps.patternTop = element.patternTop;
        editableProps.patternWidth = element.patternWidth;
        editableProps.patternHeight = element.patternHeight;
        editableProps.patternAngle = element.patternAngle;
        editableProps.patternActive = element.patternActive;
        editableProps.patternFit = element.patternFit;
        editableProps.imageFit = element?.imageFit;
      }
      if (element.type === "i-text") {
        editableProps.type = element.type;
        editableProps.name = element.name;
        editableProps.color = element.gradient
          ? element.gradient
          : !patternFilled
          ? element.fill
          : null;
        editableProps.stroke = element.stroke ? element.stroke : "#ffffff00";
        editableProps.strokeWidth = element.strokeWidth;
        editableProps.fontSize = element.fontSize;
        editableProps.fontFamily = element.fontFamily;
        editableProps.backgroundColor = element.backgroundColor
          ? element.backgroundColor
          : "#ffffff00";
        editableProps.URL = element?.URL;
        editableProps.fillGradient = element.fillGradient;
      } else if (element.type === "rect") {
        editableProps.type = element.type;
        editableProps.name = element.name;
        editableProps.color = element.gradient
          ? element.gradient
          : !patternFilled
          ? element.fill
          : null;
        editableProps.rx = element?.rx;
        editableProps.ry = element?.ry;
        editableProps.stroke = element.stroke ? element.stroke : "#ffffff00";
        editableProps.strokeWidth = element.strokeWidth;
        // editableProps.BorderLock = element?.BorderLock;
      } else if (element.type === "triangle") {
        editableProps.type = element.type;
        editableProps.name = element.name;
        editableProps.color = element.gradient
          ? element.gradient
          : !patternFilled
          ? element.fill
          : null;
        editableProps.stroke = element.stroke ? element.stroke : "#ffffff00";
        editableProps.strokeWidth = element.strokeWidth;
        // editableProps.BorderLock = element?.BorderLock;
      }
    }
    // console.log(editableProps);
    this.setState({ activeElementProps: editableProps });
  }

  render() {
    const { theme } = this.props;
    const { canvas, canvasId, canvasHeight, canvasWidth, activeElementProps } =
      this.state;
    return (
      <div
        className={`flex relative justify-between w-full h-[calc(100vh-60px)] ${
          theme === "dark" ? "bg-[#333232]" : "bg-[#e7f5ff]"
        }`}
      >
        <div
          className={`designer relative flex slim-scroll overflow-auto`}
          ref={this.canvasContainer}
        >
          <Dropzone
            ref={this.dropzoneRef}
            accept={".jpg, .png, .webp, .jpeg, .svg"}
            multiple={true}
            noClick={true}
            onDrop={(files) => {
              handleDrop(files, (elements) => {
                console.log(elements);
                this.addElements(elements);
              });
            }}
          >
            {({ getRootProps, isDragActive }) => (
              <section className={`dropzone-container`}>
                <div {...getRootProps({ className: "dropzone" })}>
                  <React.Fragment>
                    <div className={isDragActive ? "drag-active" : ""}>
                      <React.Fragment>
                        <div className="flex p-4 slim-scroll">
                          <canvas
                            id={`canvas-${canvasId}`}
                            className=" border-[#ff4747] border-[2px] border-dashed"
                          />
                        </div>
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div
          className={`sidepanel border absolute right-4 top-4 pb-10 rounded-[4px] ${
            theme === "light" ? "bg-white" : "bg-[#181717]"
          } border-[#989898]`}
          style={{
            overflow: "auto"
          }}
        >
          <>
            <input
              ref={this.imagetoCanvasRef}
              className="hidden"
              type="file"
              accept={ACCEPTED_FILES}
              onChange={(e) => {
                onAddImageFromFile(e, this, canvasHeight, canvasWidth);
              }}
              onClick={(e) => {
                onAddImageFromFile(e, this, canvasHeight, canvasWidth);
              }}
            />
            <input
              ref={this.svgInputRef}
              className="hidden"
              type="file"
              accept=".svg, .png, .jpg, .jpeg, .webp, .gif"
              // onChange={(e) => onSelectFile(e, this)}
              // onClick={(e) => onSelectFile(e, this)}
            />
            <CanvasControls
              onChange={(action, data) => {
                handleRightPanelUpdates(action, data, this);
              }}
              jsonRef={this.jsonRef}
              canvas={canvas}
              handleJsonData={this.handleJsonData}
            />
            <div className="w-[300px] mx-2">
              {activeElementProps &&
                (activeElementProps.type === "i-text" ? (
                  <TextControls
                    canvas={canvas}
                    setActiveElementProps={() => this.setActiveElementProps()}
                    activeElementProps={activeElementProps}
                    elementsDropDownData={[]}
                    theme="light"
                  />
                ) : activeElementProps.type === "rect" ? (
                  <RectangleControls
                    canvas={canvas}
                    setActiveElementProps={() => this.setActiveElementProps()}
                    activeElementProps={activeElementProps}
                    elementsDropDownData={[]}
                    theme="light"
                  />
                ) : activeElementProps.type === "triangle" ? (
                  <TriangleControls
                    canvas={canvas}
                    setActiveElementProps={() => this.setActiveElementProps()}
                    activeElementProps={activeElementProps}
                    elementsDropDownData={[]}
                    theme="light"
                  />
                ) : null)}
            </div>
          </>
        </div>
      </div>
    );
  }
}

export default FabricEditor2;
