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
  color = "#fff",
  ...restProps
}) => {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);

  const colorChangeHandler = (color) => {
    try {
      onChange(color);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(restProps);
  return (
    <div className={containerClassName}>
      <Label className="mb-1">{label}</Label>
      {description ? <p className="Title" ref={descriptionRef}></p> : null}
      <div
        className={`relative border border-slate-200 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300  rounded-sm shadow-sm ${className}`}
      >
        <Input
          value={color}
          className="border-none shadow-none"
          onChange={(e) => {
            colorChangeHandler(e.target.value);
          }}
        />
        <div className="absolute right-2 top-1.25 ">
          <ColorSelector
            {...restProps}
            color={color}
            optData={opt}
            onChange={(color) => colorChangeHandler(color)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
