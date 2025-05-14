import React, { useEffect } from "react";
import { CustomPicker } from "react-color";
import { noop } from "lodash";
import Hue from "react-color/lib/components/common/Hue";
import Saturation from "react-color/lib/components/common/Saturation";
import Alpha from "react-color/lib/components/common/Alpha";

import ChromePointerCircle from "./chrome-pointer-circle";
import ChromePointer from "./chrome-pointer";
import ChromeFields from "./chrome-fields";
import { SketchPresetColors } from "./sketch-preset-colors.jsx";
// import { createColorText } from "@/helper";

const PRESET_COLORS = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#f48c06",
  "#ba181b",
  "#660708",
  "#009688",
  "#004842",
  "#000000",
  "#f5f3f4",
  "#FFFFFF",
];

const createColorText = (color) => {
  if (!color) return "#000000";
  let _color;
  const isStr = typeof color === "string" ? true : false;
  if (isStr) {
    _color = color;
  } else if (typeof color === "object") {
    // we will use rgb from color object only if, alpha is used
    if (color.rgb.a === 1) {
      //  no alpha used, used hex value instead
      console.log(color.hex);
      _color = color.hex;
    } else {
      // alpha is present
      // create rgba text
      _color = "rgba(" + Object.values(color.rgb).join(",") + ")";
    }
  }
  return _color;
};

class SubPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSiteColor: false,
    };
  }
  render() {
    const {
      hsl,
      hsv,
      hex,
      rgb,
      label,
      onChange,
      disableAlpha,
      swatches = PRESET_COLORS,
      opt,
      elemRef,
    } = this.props;
    console.log(hex);
    const styles = {
      saturation: {
        width: "100%",
        paddingBottom: "55%",
        position: "relative",
        border: "1px solid #bababa",
      },
      hue: {
        height: "12px",
        position: "relative",
        border: "1px solid #bababa",
      },
      alpha: {
        position: "relative",
        margin: "10px 0px",
        height: "12px",
        border: "1px solid #bababa",
      },
      Alpha: {
        height: "10px",
        width: "100%",
      },
      body: {
        padding: "8px 0 0 0",
      },
    };

    const containerStyles = {
      width: opt?.fullWidth
        ? "100%"
        : opt?.containerWidth
        ? opt?.containerWidth
        : null,
    };

    const controlStyles = {
      width: opt?.controlWidth ? opt?.controlWidth : "200px",
    };
    console.log(hex);
    return (
      <div
        className="control-wrapper"
        style={{
          ...containerStyles,
        }}
        ref={elemRef?.current}
      >
        <div style={{ ...controlStyles }}>
          {label ? <Label className="InputLabel">{label}</Label> : null}
          <div style={styles.saturation}>
            <Saturation
              style={styles.saturation}
              hsl={hsl}
              hsv={hsv}
              pointer={ChromePointerCircle}
              onChange={onChange}
            />
          </div>
          <div style={styles.body}>
            <div style={styles.hue}>
              <Hue hsl={hsl} pointer={ChromePointer} onChange={onChange} />
            </div>
            <div style={styles.alpha}>
              <Alpha
                style={styles.Alpha}
                pointer={ChromePointer}
                rgb={rgb}
                hsl={hsl}
                onChange={onChange}
              ></Alpha>
            </div>
            <ChromeFields
              hex={hex}
              onChange={onChange}
              disableAlpha={disableAlpha}
            />
            <SketchPresetColors
              colors={swatches}
              onClick={onChange}
              onSwatchHover={noop}
            />
          </div>
        </div>
      </div>
    );
  }
}

// create a custom picker
const CustomColorPicker = CustomPicker(SubPopup);
const ColorSelector = ({ onChange, ...restProps }) => {
  const handleChange = (color) => {
    const _color = createColorText(color);
    onChange(_color);
  };

  // useEffect(() => {
  //   handleChange(color);
  // }, []);

  return <CustomColorPicker onChange={handleChange} {...restProps} />;
};

export default ColorSelector;
