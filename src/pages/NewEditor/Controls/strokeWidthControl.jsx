import React from "react";
import { Input } from "@/components/ui/input";

const StrokeWidthControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <Input
        label="Border Thickness:"
        type={"number"}
        value={activeElementProps.strokeWidth}
        onChange={(e) => {
          if (e.target.value >= 0) {
            selectedElement.set({ strokeWidth: Number(e.target.value) });
            canvas.renderAll();
            setActiveElementProps();
          }
        }}
      />
    );
};

export default StrokeWidthControl;
