import React from "react";
import { Label } from "@/components/ui/label";
import Dropdown from "@/components/ui/custom/dropdown";
import { getFrontDropdownData, setfontfamily } from "../helper";

const FontFamilyControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="font-family-control">
        <Label>Font Family:</Label>
        <Dropdown
          placeHolder={activeElementProps?.fontFamily}
          value={activeElementProps?.fontFamily}
          options={getFrontDropdownData()}
          onValueChange={(value) => {
            setfontfamily(value, canvas);
            setActiveElementProps();
          }}
        />
      </div>
    );
};

export default FontFamilyControl;
