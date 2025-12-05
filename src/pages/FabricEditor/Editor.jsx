import React, { Component } from "react";
import Page from "./canvas-page";
import RightPanel from "./Controls/rightpanel";

// CONSTANTS
import { ACCEPTED_FILES } from "./Constants/designer-constants";
import { FONT_PROPS_DEFAULT } from "./Constants/font";
import { getCanvasElementNames } from "./Constants/designer-icons";

// HELPERS
import {
  handleDrop,
  onSelectFile,
  onSelectImage,
  initializeApp,
  handleJsonData,
  handleOutsideClick,
  onAddImageFromFile,
  handleRightPanelUpdates,
  createCanvasElementsDropdownData,
} from "./helper-functions";
import Dropzone from "react-dropzone";

// STYLE
import "./googlefonts.css";

class FabricEditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElementProps: {
        id: "",
        colors: [],
        ...Object.assign({}, FONT_PROPS_DEFAULT),
      },
      pageHeight: 0,
      pageWidth: 0,
      showStyleEditor: false,
      pages: [],
      canvases: {},
      activePageID: null,
      pageBgColor: "#ffffff",
      elementsDropDownData: [],
      selectedElementId: null,
      selectedElementName: "",
      isTemplateLoaded: false,
      isCanvasActive: true,
      modalActive: false,
      isSidePanelOpen: true,
    };
    this.canvasEditor = React.createRef();
    this.jsonRef = React.createRef();
    this.imagetoLibInputRef = React.createRef();
    this.imagetoCanvasRef = React.createRef();
    this.svgInputRef = React.createRef();
    this.dropzoneRef = React.createRef();
  }

  componentDidMount() {
    this.canvasEditor.current.addEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
    initializeApp(this);
  }

  componentWillUnmount() {
    this.canvasEditor.current.removeEventListener("click", (e) =>
      handleOutsideClick(e, this)
    );
  }

  render() {
    const {
      pages,
      error,
      pageWidth,
      pageHeight,
      pageBgColor,
      modalActive,
      activePageID,
      isCanvasActive,
      showStyleEditor,
      isTemplateLoaded,
      selectedElementId,
      activeElementProps,
      selectedElementName,
      elementsDropDownData,
    } = this.state;
    const { theme } = this.props;
    const _canvas = Object.values(this.state.canvases)[0];
    return (
      <div
        className={`flex relative top-[15px] px-4 justify-between w-full ${
          theme === "dark" ? "bg-[#333232]" : ""
        }`}
      >
        <div
          className={`designer relative flex slim-scroll overflow-auto`}
          ref={this.canvasEditor}
        >
          <Dropzone
            ref={this.dropzoneRef}
            accept={".jpg, .png, .webp, .jpeg, .svg"}
            multiple={true}
            noClick={true}
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles, this)}
          >
            {({ getRootProps, isDragActive }) => (
              <section className={`dropzone-container`}>
                <div {...getRootProps({ className: "dropzone" })}>
                  <React.Fragment>
                    <div className={isDragActive ? "drag-active" : ""}>
                      <React.Fragment>
                        <div className="flex p-2 slim-scroll">
                          {pages.map((page) => {
                            return (
                              <Page
                                isCanvasActive={isCanvasActive && !modalActive}
                                selectedElementId={selectedElementId}
                                key={`page-${page.id}`}
                                activePageID={activePageID}
                                _canvas={_canvas}
                                config={page}
                                activeElementProps={activeElementProps}
                                isTemplateLoaded={isTemplateLoaded}
                                ontemplateLoaded={(elem, __canvas) => {
                                  this.setState(
                                    {
                                      isTemplateLoaded: true,
                                    },
                                    () => {
                                      __canvas.clearHistory();
                                      __canvas.requestRenderAll();
                                      if (elem) {
                                        __canvas.setActiveObject(elem);
                                        __canvas.renderAll();
                                      }
                                    }
                                  );
                                }}
                                onCanvasPostInit={(id, canvas) => {
                                  canvas.renderAll();
                                  this.setState({
                                    canvases: {
                                      ...this.state.canvases,
                                      [id]: canvas,
                                    },
                                  });
                                }}
                                pageBgColor={pageBgColor}
                                onElementsRendered={() => {
                                  createCanvasElementsDropdownData(this);
                                }}
                                onElementDeleteRequested={(action) =>
                                  handleRightPanelUpdates(action, null, this)
                                }
                                onElemSelect={(
                                  showStyleEditor,
                                  activeElementProps,
                                  __canvas
                                ) => {
                                  if (
                                    activeElementProps.id !== selectedElementId
                                  ) {
                                    if (__canvas) {
                                      __canvas
                                        .getObjects()
                                        .forEach(function (item) {
                                          if (
                                            item.id === activeElementProps.id
                                          ) {
                                            __canvas.setActiveObject(item);
                                            __canvas.renderAll();
                                          }
                                        });
                                      const canvasElementNames =
                                        getCanvasElementNames(__canvas);
                                      this.setState({
                                        showStyleEditor,
                                        activeElementProps,
                                        selectedElementName:
                                          activeElementProps.name,
                                        selectedElementId:
                                          activeElementProps.id,
                                        elementsDropDownData:
                                          canvasElementNames,
                                      });
                                    }
                                  } else {
                                    this.setState({
                                      showStyleEditor,
                                      activeElementProps,
                                      selectedElementName:
                                        activeElementProps.name,
                                      selectedElementId: activeElementProps.id,
                                    });
                                  }
                                }}
                                setSelectedName={(name) => {
                                  _canvas.getActiveObject().name = name;
                                  this.setState({
                                    selectedElementName: name,
                                  });
                                }}
                              />
                            );
                          })}
                        </div>
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {/* Toggle button */}
        <button
          className={`absolute rounded-tl-[5px] rounded-bl-[5px] ${this.state.isSidePanelOpen ? "right-[336px]" : "right-4"}  ${
            theme === "light" ? "bg-white" : "bg-[#181717]"
          } border border-[#989898] transition-all top-[25px] -translate-y-1/2 z-50  px-2 py-2 cursor-pointer`}
          onClick={() => this.setState({ isSidePanelOpen: !this.state.isSidePanelOpen })}
        >
          {this.state.isSidePanelOpen ? ">" : "<"}
        </button>

        {/* Side panel */}
        <div
          className={`sidepanel border absolute right-4 transition-all duration-300 ${
            theme === "light" ? "bg-white" : "bg-[#181717]"
          } border-[#989898] ${
            this.state.isSidePanelOpen ? "w-[320px] opacity-100" : "w-[0px] opacity-0 overflow-hidden"
          }`}
        >
          <>
            <input
              ref={this.imagetoLibInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                onSelectImage(e, this);
              }}
              onClick={(e) => {
                onSelectImage(e, this);
              }}
            />
            <input
              ref={this.imagetoCanvasRef}
              className="hidden"
              type="file"
              accept={ACCEPTED_FILES}
              onChange={(e) => {
                onAddImageFromFile(e, this, pageHeight, pageWidth);
              }}
              onClick={(e) => {
                onAddImageFromFile(e, this, pageHeight, pageWidth);
              }}
            />
            <input
              ref={this.svgInputRef}
              className="hidden"
              type="file"
              accept=".svg, .png, .jpg, .jpeg, .webp, .gif"
              onChange={(e) => onSelectFile(e, this)}
            />
            <RightPanel
              canvas={_canvas}
              elementsDropDownData={elementsDropDownData}
              onCanvasActive={(isActive) => {
                if (modalActive) {
                  this.setState({
                    isCanvasActive: false,
                  });
                } else {
                  this.setState({
                    isCanvasActive: isActive,
                  });
                }
              }}
              error={error}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              pageBgColor={pageBgColor}
              showStyleEditor={showStyleEditor}
              selectedElementName={selectedElementName}
              selectedElementId={selectedElementId}
              activeElementProps={activeElementProps}
              onChange={(action, data) => {
                console.log(action);
                handleRightPanelUpdates(action, data, this);
              }}
              handleJsonData={(e) => handleJsonData(e, this)}
              jsonRef={this.jsonRef}
              siteColorsSettings={this.props.siteColorsSettings}
            />
          </>
        </div>
      </div>
    );
  }
}

export default FabricEditorPage;
