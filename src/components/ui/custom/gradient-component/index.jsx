import { Component } from "react";
import { noop } from "lodash";
import { Label } from "@/components/ui/label";
import GradientPreview from "./gradient-preview/gradient-preview";
import GradientContext, { GradientProvider } from "./gradient-context";
import GradientControls from "./gradient-controls/gradient-controls";
import ColorSelector from "@/components/ui/custom/color-input/color-picker";

class GradientMaker extends Component {
  static contextType = GradientContext;
  constructor(props) {
    super(props);
    this.state = {
      switchToColor: props.config.colorStops.length < 2 ? true : false,
    };
  }

  render() {
    const {
      config,
      previewHeight,
      previewWidth,
      onGradientChange,
      label,
      containerClass,
      canChooseGradientType,
      isGradientAllowed,
      siteColorData,
      nativeElement,
      onOutsideClick,
      showSiteColorBtn,
      value,
    } = this.props;

    return (
      <div
        className={`control-wrapper GradientMaker rounded-[4px] p-2 border-grey-100 canvas-parent ${
          containerClass ?? ""
        }`}
      >
        {label ? <Label className="InputLabel">{label}</Label> : null}
        <div>
          {!isGradientAllowed || this.state.switchToColor ? (
            <ColorSelector
              color={config.colorStops[0].color}
              elemRef={nativeElement}
              onOutsideClick={onOutsideClick}
              siteColorData={siteColorData}
              showSiteColor={this.state.showSiteColor}
              showSiteColorBtn={showSiteColorBtn}
              showInPopup={false}
              controlStyle={{
                width: "35px",
                height: "18px",
                marginRight: "4px",
              }}
              optData={{ showSiteSettings: showSiteColorBtn }}
              onChange={(color) => {
                onGradientChange({
                  config: {
                    colorStops: [
                      {
                        color,
                        offset: 10,
                      },
                    ],
                    type: "linear",
                    angle: 45,
                  },
                  gradient: color,
                });
              }}
            />
          ) : isGradientAllowed && !this.state.switchToColor ? (
            <GradientProvider>
              <GradientPreview
                width={previewWidth}
                height={previewHeight}
                config={config}
                value={value}
              />
              <div className="controls-small slim-scroll">
                <GradientControls
                  config={config}
                  canChooseGradientType={canChooseGradientType}
                  onControlValueChange={(value) => {
                    onGradientChange({
                      config: value.config,
                      gradient: value.gradient,
                    });
                  }}
                />
              </div>
            </GradientProvider>
          ) : null}
        </div>
        {isGradientAllowed ? (
          <span className="siteSettingsBtn mt-[5px]">
            <a
              className="cursor-pointer"
              onClick={() => {
                this.setState({
                  switchToColor: !this.state.switchToColor,
                });
              }}
            >
              {this.state.switchToColor ? "Use Gradient" : "Use Color"}
            </a>
          </span>
        ) : null}
      </div>
    );
  }
}

GradientMaker.defaultProps = {
  previewHeight: 120,
  previewWidth: 200,
  onGradientChange: noop,
  opt: {},
  containerStyle: {},
  controlStyle: {},
  canChooseGradientType: true,
  isGradientAllowed: true,
  showSiteColorBtn: false,
};

export default GradientMaker;
