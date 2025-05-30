import React from "react";
import { fabric } from "fabric";
import { makeGradient } from "../helper";
import GradientContainer from "@/components/ui/custom/gradient-container";

const GradientOrColorControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <GradientContainer
        label="Primary Color:"
        // label={`${activeElementProps.type} Color:`}
        showSiteColorBtn={false}
        canChooseGradientType={true}
        value={activeElementProps.color}
        previewWidth={200}
        switchToColor={activeElementProps.color ? false : true}
        showInPopup={false}
        opt={{ showInput: true }}
        isGradientAllowed={true}
        containerClass={"gradient"}
        onValueChange={(gradientText, rawConfig) => {
          if (rawConfig) {
            let grad = makeGradient(rawConfig, gradientText, selectedElement);
            if (rawConfig.colorStops.length < 2) {
              selectedElement.set({ fill: grad, gradient: null });
            } else {
              const newGradient = new fabric.Gradient(grad);
              selectedElement.set({
                fill: newGradient,
                gradient: gradientText,
              });
            }
          } else {
            selectedElement.set("fill", gradientText);
          }
          selectedElement.ElementColor = activeElementProps?.color;
          canvas.renderAll();
          setActiveElementProps();
        }}
      />
    );
};

export default GradientOrColorControl;
