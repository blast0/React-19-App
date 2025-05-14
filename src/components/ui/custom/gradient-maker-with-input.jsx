import { useEffect, useRef } from "react";
import { useState } from "react";

import { convertGradientToConfig } from "./utilities";
import GradientMakerWithPopup from "./gradient-maker-with-popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "../../../context/themeProvider";

const GradientMakerWithInput = ({
  label,
  opt,
  tooltip,
  containerStyle,
  containerClass,
  value,
  description,
  controlStyle,
  onValueChange,
  canChooseGradientType,
  // theme,
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

  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : "",
    ...containerStyle,
  };

  const controlStyles = {
    width: opt?.controlWidth ? opt?.controlWidth : "",
    ...controlStyle,
  };
  return (
    <>
      <div
        className={`${containerClass ?? ""}`}
        style={{ ...containerStyles }}
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
          className="flex border border-slate-200 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300  GradientWithInput justify-center items-center rounded-sm shadow-sm"
          style={{ ...controlStyles }}
        >
          <Input
            className="border-none shadow-none"
            value={gradient}
            onChange={(e) => {
              setGradient(e.target.value);
              onValueChange({ gradient: e.target.value, config: null });
            }}
          />

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
    </>
  );
};
export default GradientMakerWithInput;
