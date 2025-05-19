import { useEffect, useRef } from "react";
import { useState } from "react";

import { convertGradientToConfig } from "./utilities";
import GradientMakerWithPopup from "./gradient-maker-with-popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "../../../context/themeProvider";

const GradientMakerWithInput = ({
  label,
  value,
  onBlur,
  onFocus,
  tooltip,
  containerStyle,
  containerClass,
  description,
  controlStyle,
  onValueChange,
  canChooseGradientType,
  ...restProps
}) => {
  const descriptionRef = useRef(null);
  const [gradient, setGradient] = useState(value);
  const { darkMode } = useTheme();
  const theme = darkMode ? "dark" : "light";
  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
    setGradient(value);
  }, [description, value]);

  return (
    <>
      <div
        className={`${containerClass ?? ""}`}
        style={{ ...containerStyle }}
        title={tooltip ? tooltip : label}
      >
        {label ? (
          <Label
            title={label}
            className={`InputLabel mb-1 ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            {label}
          </Label>
        ) : null}
        {description ? <p className="Title" ref={descriptionRef}></p> : null}
        <div
          className="relative border border-slate-200 dark:border-slate-200 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 justify-between items-center rounded-sm shadow-sm"
          style={{ ...controlStyle }}
        >
          <Input
            className="border-none shadow-none"
            value={gradient}
            onFocus={() => {
              onFocus();
            }}
            onBlur={() => {
              onBlur();
            }}
            onChange={(e) => {
              setGradient(e.target.value);
              onValueChange({ gradient: e.target.value, config: null });
            }}
          />
          <div className="absolute right-0 top-[5px]">
            <GradientMakerWithPopup
              {...restProps}
              onValueChange={(val) => {
                setGradient(val.gradient);
                onValueChange(val);
              }}
              value={gradient}
              config={convertGradientToConfig(value)}
              switchToColor={restProps.switchToColor}
              canChooseGradientType={canChooseGradientType}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default GradientMakerWithInput;
