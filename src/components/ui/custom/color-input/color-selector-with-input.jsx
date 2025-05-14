import React, { useRef, useEffect } from "react";

import ColorSelector from "./color-selector-with-popup";
import { Input } from "../../input";

const ColorSelectorWithInput = ({
  label,
  tooltip,
  description,
  opt,
  containerClass,
  containerStyle,
  controlStyle,
  onChange,
  ...restProps
}) => {
  const descriptionRef = useRef(null);

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

  useEffect(() => {
    if (description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);

  const colorChangeHandler = (color) => {
    onChange(color);
  };

  return (
    <div
      className={`control-wrapper ${containerClass ?? ""}`}
      style={{ ...containerStyles }}
      title={tooltip ? tooltip : label}
    >
      {label ? (
        <Label title={label} className="InputLabel">
          {label}
        </Label>
      ) : null}
      {description ? <p className="Title" ref={descriptionRef}></p> : null}
      <div
        className="ColorSelectorWithInput rounded-md"
        style={{ ...controlStyles }}
      >
        <Input
          className={"border-none"}
          value={restProps?.color}
          onChange={(e) => {
            colorChangeHandler(e.target.value);
          }}
        />
        <ColorSelector
          {...restProps}
          optData={opt}
          containerStyle={{
            marginRight: "10px",
          }}
          onChange={(color) => colorChangeHandler(color)}
        />
      </div>
    </div>
  );
};

export default ColorSelectorWithInput;
