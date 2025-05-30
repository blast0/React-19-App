import React from "react";
import { Label } from "@/components/ui/label";
import { handlePatternFit, scaleElementTofitCanvas } from "../helper";
import Dropdown from "@/components/ui/custom/dropdown";
const ImageFitControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="image-fit-control">
        <Label>
          {activeElementProps?.patternActive
            ? "Background Pattern Fit:"
            : selectedElement?.type === "group"
            ? "Group Fit:"
            : selectedElement?.type + " Fit:"}
        </Label>
        <Dropdown
          placeHolder={
            activeElementProps?.patternActive
              ? activeElementProps.patternFit
              : selectedElement?.imageFit
          }
          value={
            activeElementProps?.patternActive
              ? activeElementProps.patternFit
              : activeElementProps?.imageFit
          }
          options={[
            {
              name: activeElementProps?.patternActive
                ? "Show full Image"
                : "Show full Svg",
              value: activeElementProps?.patternActive
                ? "Show full Image"
                : "Show full Svg",
            },
            {
              name: activeElementProps?.patternActive
                ? "Fit Image"
                : "Fit Image to boundary",
              value: activeElementProps?.patternActive
                ? "Fit Image"
                : "Fit Image to boundary",
            },
          ]}
          onValueChange={(value) => {
            if (selectedElement.patternActive) {
              const newProps = handlePatternFit(value, canvas, selectedElement);
              selectedElement.set({
                ...newProps,
              });
              canvas.renderAll();
              setActiveElementProps();
            } else {
              scaleElementTofitCanvas(
                value,
                canvas.height,
                canvas.width,
                selectedElement
              );
              canvas.renderAll();
              setActiveElementProps();
            }
          }}
        />
      </div>
    );
};

export default ImageFitControl;
