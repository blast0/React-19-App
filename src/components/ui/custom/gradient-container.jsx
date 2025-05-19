import { memo } from "react";
import { isEqual } from "lodash";
import GradientMakerWithInput from "./gradient-maker-with-input";
import GradientMakerWithPopup from "./gradient-maker-with-popup";
import GradientMaker from "./gradient-component/index";
import { convertGradientToConfig } from "./utilities";

const GradientContainer = ({ showInPopup, ...restProps }) => {
  const config =
    typeof restProps.value === "object"
      ? convertGradientToConfig(restProps.value)
      : restProps.value;
  return (
    <>
      {showInPopup ? (
        <GradientMakerWithPopup
          {...restProps}
          onValueChange={(val) =>
            restProps.onValueChange(val.gradient, val.config)
          }
        />
      ) : restProps?.opt?.showInput ? (
        <GradientMakerWithInput
          {...restProps}
          onValueChange={(val) => {
            if (val?.config?.colorStops > 1) {
              restProps.onValueChange(val.gradient, val.config);
            } else {
              restProps.onValueChange(val.gradient);
            }
          }}
        />
      ) : (
        <GradientMaker
          {...restProps}
          outsideClickExcludeSelectors={[
            ".ddList",
            ".chrome-picker-container",
            ".Gradient-Icon",
          ]}
          label={restProps.label}
          controlStyle={{ ...restProps.controlStyle, gap: "20px" }}
          config={config}
          onGradientChange={(val) =>
            restProps.onValueChange(val.gradient, val.config)
          }
        />
      )}
    </>
  );
};

export default memo(GradientContainer, isEqual);
