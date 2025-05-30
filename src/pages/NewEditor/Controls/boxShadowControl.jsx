import React from "react";
import { Label } from "@/components/ui/label";
import BoxShadowWithInput from "@/components/ui/custom/box-shadow";
import { handleShadow } from "../helper";
const BoxShadowControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="shadow-control">
        <Label>Box Shadow:</Label>
        <BoxShadowWithInput
          labele="Ads"
          showPreview={false}
          value={
            selectedElement?.boxShadow
              ? selectedElement?.boxShadow
              : "#606060 0px 0px 5px"
          }
          containerClass={"box-shadow"}
          showCopyClipboard={false}
          showSpread={false}
          showTypeButton={false}
          onChange={(e) => {
            handleShadow(e, canvas);
          }}
        />
      </div>
    );
};

export default BoxShadowControl;
