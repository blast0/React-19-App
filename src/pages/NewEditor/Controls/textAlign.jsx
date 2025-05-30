import React from "react";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { TEXT_ALIGNMENT } from "../designer-icons";

const TextAlignmentControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="text-alignment">
        <Label>Text Alignment:</Label>
        <div className="flex gap-0.5">
          {TEXT_ALIGNMENT.map((item) => (
            <Title key={item.bId} title={item.title}>
              <Button
                key={item.bId}
                type="button"
                size="icon-xs"
                onClick={() => {
                  selectedElement.set({
                    textAlign: item.bId,
                  });
                  canvas.renderAll();
                  setActiveElementProps();
                }}
              >
                {item.icon}
              </Button>
            </Title>
          ))}
        </div>
      </div>
    );
};

export default TextAlignmentControl;
