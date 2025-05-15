import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoxShadow from "./box-shadow";
const BoxShadowWithPopUp = (props) => {
  const {
    label,
    tooltip,
    containerStyle,
    controlStyle,
    opt,
    onChange,
    ...restProps
  } = props;

  const [showSubPopup, setShowSubPopup] = useState(false);
  const elemRef = useRef(null);
  const containerStyles = {
    width: opt?.fullWidth
      ? "100%"
      : opt?.containerWidth
      ? opt?.containerWidth
      : null,
    height: opt?.fullHeight
      ? "100%"
      : opt?.containerHeight
      ? opt?.containerHeight
      : null,
    ...containerStyle,
  };
  const handleCrossClick = () => {
    onChange("");
  };
  return (
    <div className="control-wrapper" style={{ ...containerStyles }}>
      <Popover>
        <PopoverTrigger>
          <div className="flex" style={{ gap: "3px" }}>
            <div
              className="Box-shadow-Icon icon tooltip tooltip-top"
              style={{
                ...controlStyle,
              }}
              data-tooltip={tooltip ? tooltip : label}
              ref={elemRef}
              onClick={() => {
                setShowSubPopup((prevShowSubPopup) => !prevShowSubPopup);
              }}
            ></div>
            <div
              className="shadow-cross-icon"
              title="Clear"
              onClick={() => {
                handleCrossClick();
              }}
            >
              <i className="icon-close p-1 text-[10px]"></i>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[235px]">
          <BoxShadow
            nativeElement={elemRef?.current}
            outsideClickExcludeSelectors={[
              ".ddList",
              ".chrome-picker-container",
              ".Box-shadow-Icon",
              ".SubPopup",
            ]}
            onOutsideClick={() => setShowSubPopup(!showSubPopup)}
            label={label}
            radius={opt?.radius}
            {...restProps}
            onChange={(e) => onChange(e)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BoxShadowWithPopUp;
