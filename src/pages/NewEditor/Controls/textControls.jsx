import React from "react";
import { addPattern } from "../helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import FileInput from "@/components/ui/custom/file-input";
import GradientOrColorControl from "./fillControl";
import StrokeWidthControl from "./strokeWidthControl";
import StrokeColorControl from "./strokeColorControl";
import BackgroundColorControl from "./backgroundColor";
import ImageFitControl from "./imageFitControl";
import BoxShadowControl from "./boxShadowControl";
import TextAlignmentControl from "./textAlign";
import FontFamilyControl from "./fontFamilyControl";
import TextStyleControl from "./textStyleControl";
import FlipElementControl from "./flipControl";

const TextControls = (props) => {
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

  const activeBgColor = (
    <BackgroundColorControl
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

  const AlignText = (
    <TextAlignmentControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const activeFontFamily = (
    <FontFamilyControl
      canvas={canvas}
      setActiveElementProps={setActiveElementProps}
      activeElementProps={activeElementProps}
    />
  );

  const TextStyles = (
    <TextStyleControl
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
          addPattern(url, canvas, () => {
            canvas.renderAll();
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

  return (
    <div className="font-controls flex flex-wrap gap-2">
      <div className="w-[48%] gap-[14px]">
        {!selectedElement?.patternActive
          ? activeElementColor
          : activeBorderColor}
      </div>
      <div className="w-[48%]">{activeBgColor}</div>
      <div className="w-[48%]">{activeBorderThickness}</div>
      <div className="w-[48%]">
        {!selectedElement?.patternActive ? activeBorderColor : imageFit}
      </div>
      <div className="w-[48%]">{activeFontFamily}</div>
      <div className="w-[48%]">{TextStyles}</div>
      <div className="w-[70%]">{boxShadow}</div>
      {FlipElement}
      <div className="w-[48%]">
        {selectedElement.textLines?.length > 1 ? AlignText : null}
      </div>
      {patternImgController}
      {selectedElement?.patternActive ? activePattern : null}
    </div>
  );
};

export default TextControls;
