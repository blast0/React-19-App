import React from "react";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { FLIP_OPTIONS } from "../designer-icons";

const FlipElementControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="Flip-Controls">
        <Label>Flip Element:</Label>
        <div className="flex gap-0.5">
          {FLIP_OPTIONS.map((item) => (
            <Title key={item.value} title={item.title}>
              <Button
                key={item.bId}
                type="button"
                // variant="outline"
                className="h-[36px]"
                size="icon-xs"
                onClick={() => {
                  if (item.value === "x")
                    selectedElement.set("flipX", !selectedElement.flipX);
                  else selectedElement.set("flipY", !selectedElement.flipY);
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

export default FlipElementControl;
