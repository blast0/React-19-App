import React from "react";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { FONT_STYLES } from "../designer-icons";
import { handleFontStyle } from "../helper";

const TextStyleControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="text-style">
        <Label>Text Style:</Label>
        <div className="flex gap-0.5">
          {FONT_STYLES.map((item) => (
            <Title key={item.value} title={item.title}>
              <Button
                key={item.bId}
                type="button"
                className=" h-[36px]"
                // variant="outline"
                size="icon-xs"
                onClick={() => {
                  handleFontStyle(item.value, selectedElement);
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

export default TextStyleControl;
