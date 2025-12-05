import { noop, orderBy } from "lodash";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertGradientToConfig } from "./utilities";
import GradientMaker from "./gradient-component/index";

function convertToText(config) {
  const { colorStops, type, angle } = config;
  let gradient = "";
  const colorStopsNext = orderBy(colorStops, ["offset"], ["asc"]);
  colorStopsNext.forEach((tab) => {
    gradient = gradient + `${tab.color} ${tab.offset}%,`;
  });
  gradient = gradient.slice(0, gradient.length - 1);
  switch (type) {
    case "linear":
      gradient = `${type}-gradient(${angle}deg, ${gradient})`;
      break;
    case "radial":
      gradient = `${type}-gradient(circle at center, ${gradient})`;
      break;
    default:
      break;
  }
  return gradient;
}

function GradientMakerWithPopup({
  label = "",
  tooltip = "",
  opt = {},
  onValueChange = noop,
  value = "",
  canChooseGradientType = false,
  controlStyle = {},
  switchToColor = false,
  ...restProps
}) {
  const userConfig = convertGradientToConfig(value);
  const userGrad = convertToText(userConfig);
  const [, setUserGradient] = useState(userGrad);
  const [showSubPopup, setShowSubPopup] = useState(false);
  const elemRef = useRef(null);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="GradientMakerWithPopUp cursor-pointer border border-slate-900 dark:border-slate-500 h-[26px] w-[26px] mr-2 rounded-2xl control-icon tooltip tooltip-top"
          data-tooltip={tooltip ? tooltip : label}
          ref={elemRef}
          style={{
            background: value,
            ...controlStyle,
          }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[225px]">
        <GradientMaker
          {...restProps}
          switchToColor={switchToColor}
          nativeElement={elemRef?.current}
          outsideClickExcludeSelectors={[
            ".ddList",
            ".chrome-picker-container",
            ".Gradient-Icon",
            ".SiteSettingsColor",
          ]}
          value={value}
          onOutsideClick={() => setShowSubPopup(!showSubPopup)}
          canChooseGradientType={canChooseGradientType}
          label={label}
          radius={opt?.radius}
          config={userConfig}
          onGradientChange={(val) => {
            onValueChange(val);
            setUserGradient(val.gradient);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default GradientMakerWithPopup;
