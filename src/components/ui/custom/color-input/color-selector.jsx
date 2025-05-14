import { useRef, useState } from "react";
import { noop } from "lodash";

import ColorPicker from "./color-picker";
import withPopup from "../../../hoc/withPopup";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";

const ColorSelectorPopup = withPopup(ColorPicker);

function ColorSelectorWithPopup(props) {
  const {
    id,
    containerStyle = {},
    controlStyle = {},
    containerClass = "",
    tooltip = "",
    color = "#000",
    handleRemove = noop,
    opt,
    showRemoveButton = false,
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
      style={{ ...containerStyles }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`ColorSelectorWithPopup w-[26px] h-[26px] rounded-2xl border border-slate-900 dark:border-slate-500 cursor-pointer ${
              tooltip ? "tooltip" : ""
            } tooltip-top `}
            id={`${id || ""}`}
            data-tooltip={tooltip ?? restProps.label}
            style={{
              backgroundColor: color,
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
        <PopoverContent className="w-max z-[55]">
          <ColorPicker
            color={color}
            {...restProps}
            nativeElement={elemRef?.current}
            onOpenSiteSettings={openSiteSettings}
            onChange={(color) => restProps.onChange(color)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColorSelectorWithPopup;
export { ColorSelectorPopup };
