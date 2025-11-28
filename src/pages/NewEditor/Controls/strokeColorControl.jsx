import React from "react";
import ColorInput from "@/components/ui/custom/color-input";

const StrokeColorControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <ColorInput
        label="Border Color:"
        value={activeElementProps?.stroke || 0}
        onChange={(color) => {
          selectedElement.set({ stroke: color });
          canvas.renderAll();
          setActiveElementProps();
        }}
      />
    );
};

export default StrokeColorControl;
