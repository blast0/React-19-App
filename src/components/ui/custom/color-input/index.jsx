import { useRef, useEffect } from "react";

import ColorSelector from "./color-selector";
import { Input } from "../../input";
import { Label } from "../../label";

const ColorInput = ({
  label,
  description,
  opt,
  containerClassName = "",
  className = "",
  onChange,
  value = "#fff",
  ...restProps
}) => {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);
  return (
    <div className={containerClassName}>
      <Label className="mb-1">{label}</Label>
      {description ? <p className="Title" ref={descriptionRef}></p> : null}
      <div
        className={`flex items-center justify-center relative border border-slate-200 dark:border-slate-200 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300  rounded-sm shadow-sm ${className}`}
      >
        <Input
          value={value}
          className="border-none shadow-none h-[34px]"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className="absolute right-2 top-1">
          <ColorSelector
            {...restProps}
            color={value}
            optData={opt}
            onChange={(color) => {
              onChange(color);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
