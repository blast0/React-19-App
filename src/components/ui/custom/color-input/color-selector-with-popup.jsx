import React, { useRef, useState } from "react";
import { noop } from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorSelector from "./color-picker";
function ColorSelectorWithPopup(props) {
  const {
    id,
    containerStyle,
    controlStyle,
    containerClass,
    tooltip,
    handleRemove,
    opt,
    showRemoveButton,
    ...restProps
  } = props;
  const [showSiteColor, setShowSiteColor] = useState(false);
  const elemRef = useRef(null);

  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : null,
    ...containerStyle,
  };
  const openSiteSettings = () => {
    setShowSiteColor(true);
  };
  return (
    <div
      className={`control-wrapper ${containerClass ?? ""} popup cursor-pointer`}
      style={{
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII")`,
        ...containerStyles,
      }}
    >
      <Popover>
        <PopoverTrigger>
          <div
            className={`ColorSelectorWithPopup ${
              tooltip ? "tooltip" : ""
            } tooltip-top `}
            id={`${id || ""}`}
            data-tooltip={tooltip ?? restProps.label}
            style={{
              backgroundColor: restProps.color,
              ...controlStyle,
            }}
            ref={elemRef}
            onClick={(e) => {
              e.stopPropagation();
              if (showSiteColor) {
                setShowSiteColor(false);
              }
            }}
          >
            {showRemoveButton ? (
              <span
                className="close-button"
                onClick={() => {
                  handleRemove(restProps.index);
                }}
              ></span>
            ) : null}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[235px]">
          <ColorSelector
            {...restProps}
            nativeElement={elemRef?.current}
            y
            onOpenSiteSettings={openSiteSettings}
            onChange={(color) => restProps.onChange(color)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

ColorSelectorWithPopup.defaultProps = {
  showRemoveButton: false,
  handleRemove: noop,
  controlStyle: {},
  containerStyle: {},
};

export default ColorSelectorWithPopup;
