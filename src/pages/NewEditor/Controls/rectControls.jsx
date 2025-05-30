import React from "react";
import { addPattern } from "../helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import FileInput from "@/components/ui/custom/file-input";
import GradientOrColorControl from "./fillControl";
import StrokeWidthControl from "./strokeWidthControl";
import StrokeColorControl from "./strokeColorControl";
import ImageFitControl from "./imageFitControl";
import BoxShadowControl from "./boxShadowControl";
import FlipElementControl from "./flipControl";
import BorderRadius from "@/components/ui/custom/borderRadius";
const RectangleControls = (props) => {
  const { canvas, activeElementProps, setActiveElementProps } = props;
  const selectedElement = canvas.getActiveObject();

  const activeElementColor = (
    <GradientOrColorControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const activeBorderThickness = (
    <StrokeWidthControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const activeBorderColor = (
    <StrokeColorControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const imageFit = (
    <ImageFitControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const boxShadow = (
    <BoxShadowControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const FlipElement = (
    <FlipElementControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const patternImgController = (
    <div className="image-url-control w-[100%]">
      <Label>Fill Image:</Label>
      <FileInput
        containerClassName="w-full"
        value={activeElementProps?.URL}
        mimeTypeExclusions={["image/svg+xml"]}
        onChange={async (url) => {
          addPattern(url, canvas, (newProps) => {
            canvas.renderAll();
            console.log(selectedElement);
            setActiveElementProps();
          });
        }}
        showImagePreview={true}
        onFileIconClick={() => {
          console.log("onFileClick");
        }}
      />
    </div>
  );

  const activePattern = (
    <>
      <div className="pattern-controls w-[100%] flex flex-wrap gap-2">
        <div className="w-[48%]">
          <Label>Image Width:</Label>
          <Input
            type={"number"}
            value={
              parseInt(activeElementProps?.patternWidth)
                ? parseInt(activeElementProps?.patternWidth)
                : ""
            }
            // onChange={(e) =>
            //   handlePatternSize(parseInt(e.target.value, 10), null, this)
            // }
          />
        </div>
        <div className="w-[48%]">
          <Label>Image Height:</Label>
          <Input
            type={"number"}
            value={
              parseInt(activeElementProps?.patternHeight)
                ? parseInt(activeElementProps?.patternHeight)
                : ""
            }
            // onChange={(e) => {
            //   handlePatternSize(null, parseInt(e.target.value, 10), this);
            // }}
          />
        </div>
        <div className="w-[48%]">
          <Label>Image Left:</Label>
          <Input
            type={"number"}
            value={activeElementProps?.patternLeft}
            // onChange={(e) =>
            //   handlePatternPosition(
            //     parseInt(e.target.value),
            //     null,
            //     null,
            //     this
            //   )
            // }
          />
        </div>
        <div className="w-[48%]">
          <Label>Image Top:</Label>
          <Input
            type={"number"}
            value={activeElementProps?.patternTop}
            // onChange={(e) =>
            //   handlePatternPosition(
            //     null,
            //     parseInt(e.target.value),
            //     null,
            //     this
            //   )
            // }
          />
        </div>
      </div>
      <div className="w-full space-y-2">
        <Label>Angle:</Label>
        <Slider
          min={0}
          max={360}
          step={1}
          unit={"°"}
          value={[activeElementProps.patternAngle]}
          // onValueChange={(value) => {
          //   this.setState({ patternAngle: parseInt(value) });
          //   handlePatternPosition(null, null, parseInt(value), this);
          // }}
        />
      </div>
    </>
  );

  const rectBorderRadius = (
    <BorderRadius
      valueVisible={false}
      onChange={(x, y, lock) => {
        if (lock !== activeElementProps?.BorderLock) {
          selectedElement.BorderLock = lock;
        }
        selectedElement.set({
          rx: x,
          ry: y,
        });
        canvas.renderAll();
        setActiveElementProps();
      }}
      lock={activeElementProps?.BorderLock}
      showLockBtn={true}
      showInputBoxes={true}
      defaultValues={[
        {
          label: "BorderX",
          min: 0,
          max: Math.min(activeElementProps?.width, activeElementProps?.height),
          value: activeElementProps?.rx,
        },
        {
          label: "BorderY",
          min: 0,
          max: Math.min(activeElementProps?.width, activeElementProps?.height),
          value: activeElementProps?.ry,
        },
      ]}
    />
    // <></>
  );

  return (
    <div className="rect-controls flex-wrap flex gap-2">
      {/* <div className="w-[48%] flex flex-col gap-3">{AlignElement}</div> */}
      {/* <div className="w-[48%] flex flex-col gap-[14px]">
        {!selectedElement?.patternActive ? activeElementColor : null}
      </div> */}

      {!selectedElement?.patternActive ? (
        <div className="w-[48%] flex flex-col gap-[14px]">
          {activeElementColor}{" "}
        </div>
      ) : null}

      <div className="w-[48%]">{activeBorderThickness}</div>
      <div className="w-[48%]">{activeBorderColor}</div>
      {!selectedElement?.patternActive ? FlipElement : null}
      <div className="w-[100%]">{boxShadow}</div>
      {rectBorderRadius}
      {patternImgController}
      {activeElementProps?.patternActive ? activePattern : null}
      {activeElementProps?.patternActive ? imageFit : null}
      {selectedElement?.patternActive ? FlipElement : null}
    </div>
  );
};

export default RectangleControls;
