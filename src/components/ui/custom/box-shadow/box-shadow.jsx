import { useEffect, useState } from "react";
import { Slider } from "../../slider";
import ColorInput from "../color-input";
import { Button } from "../../button";
import { Input } from "../../input";
import { Title } from "../../title";
import { Code2, Copy, Eye, Pencil } from "lucide-react";
import CopyToClipboard from "@/components/ui/custom/copy-to-clipboard";

const convertToConfig = (val = "") => {
  if (!val) return { type: "", shadowColor: "grey", xoffset: 5, yoffset: 5, blur: 0, spread: 0 };

  const cleaned = val.replaceAll("px", "").split(" ").filter(Boolean);
  let type = "";
  let shadowColor = "";
  let xoffset = 0, yoffset = 0, blur = 0, spread = 0;

  if (cleaned.length === 4) {
    [shadowColor, xoffset, yoffset, blur] = cleaned;
  } else if (cleaned.length === 5) {
    [shadowColor, xoffset, yoffset, blur, spread] = cleaned;
  } else if (cleaned.length === 6) {
    [type, shadowColor, xoffset, yoffset, blur, spread] = cleaned;
  }

  return {
    type,
    shadowColor,
    xoffset: Number(xoffset),
    yoffset: Number(yoffset),
    blur: Number(blur),
    spread: Number(spread),
  };
};

const BoxShadow = ({
  onChange = () => {},
  showPreview = true,
  showCopyClipboard,
  showSpread,
  showTypeButton,
  value,
}) => {
  const [config, setConfig] = useState(convertToConfig(value));
  const [showInput, setShowInput] = useState(false);
  const [activeTab, setActiveTab] = useState(""); 
  const { type, shadowColor, xoffset, yoffset, blur, spread } = config;
  const boxShadow = `${type ? type + " " : ""}${shadowColor} ${xoffset}px ${yoffset}px ${blur}px ${spread}px`;

  useEffect(() => {
    onChange(boxShadow);
  }, [boxShadow]);

  return (
    <div className="BoxShadow">
            {/* ---- TAB BUTTONS ---- */}
      <div className="flex gap-2 mb-2">
        <Button
          size="sm"
          className={activeTab === "preview" ? "bg-emerald-500 text-amber-50" : ""}
          onClick={() => {
            if(activeTab !== "preview") setActiveTab("preview")
             else setActiveTab("")
            }}
        >
          <Eye /> Prev
        </Button>
        <Button
          size="sm"
          className={activeTab === "code" ? "bg-emerald-500 text-amber-50" : ""}
          onClick={() =>{      
            if(activeTab !== "code") setActiveTab("code")
             else setActiveTab("")
            }}
        >
          <Code2 /> Code
        </Button>
        <Title title="Edit numeric inputs">
          <Button size="sm" className={showInput ? "bg-emerald-500 text-amber-50" : ""} onClick={() => setShowInput(!showInput)}>
            <Pencil />
          </Button>
        </Title>
      </div>
      {/* ---- PREVIEW TAB ---- */}
      {activeTab === "preview" && (
        <div>
          <div className="w-full flex flex-col items-center">
            <div className="text-xs font-bold">Preview</div>
            <div
              className="previewBox bg-emerald-500 my-5 w-16 h-16"
              style={{ boxShadow }}
            />
          </div>
        </div>
      )}
      {/* ---- CODE TAB ---- */}
      {activeTab === "code" && (
        <div className="w-full flex gap-2 my-2">
          <code className="text-xs border border-slate-200 p-3 rounded">
            box-shadow: {boxShadow};
          </code>
          {showCopyClipboard && (
            <CopyToClipboard
              copy={boxShadow}
              position="bottom"
              jsx={
                <Title title="Copy to clipboard">
                  <Button size="sm"><Copy /></Button>
                </Title>
              }
            />
          )}
        </div>
      )}
        <div className="Control-items">
        {showTypeButton && (
          <div className="mb-2">
            <div className="flex items-center justify-between gap-1">
            <div className="text-xs font-bold">Type</div>
            <div>
              <Button size="sm" className={type===""? "bg-emerald-500  text-amber-50": ""} onClick={() => setConfig({ ...config, type: "" })}>
                Outset
              </Button>
              <Button size="sm"  className={type==="inset"? "bg-emerald-500  text-amber-50": ""} onClick={() => setConfig({ ...config, type: "inset" })}>
                Inset
              </Button>
            </div>
            </div>
          </div>
        )}

        {/* X Offset */}
        <div className="mb-2">
          <div className="text-xs font-bold">X-offset</div>
          <div className="flex gap-2 items-center">
            <Slider
              valueVisible={!showInput}
              min={-50}
              max={50}
              value={[xoffset]}
              step={1}
              onValueChange={(value) => setConfig({ ...config, xoffset: value[0] })}
            />
            {showInput && (
            <div className="w-[100px]">
              <Input type="number" value={xoffset} onChange={(e) =>
                setConfig({ ...config, xoffset: Number(e.target.value) })
              } />
            </div>
            )}
          </div>
        </div>

        {/* Y Offset */}
        <div className="mb-2">
          <div className="text-xs font-bold">Y-offset</div>
          <div className="flex gap-2 items-center">
            <Slider
              valueVisible={!showInput}
              min={-50}
              max={50}
              value={[yoffset]}
              step={1}
              onValueChange={(value) => setConfig({ ...config, yoffset: value[0] })}
            />
            {showInput && (
            <div className="w-[100px]">
              <Input type="number" value={yoffset} onChange={(e) =>
                setConfig({ ...config, yoffset: Number(e.target.value) })
              } />
            </div>
            )}
          </div>
        </div>

        {/* Blur */}
        <div className="mb-2">
          <div className="text-xs font-bold">Blur</div>
          <div className="flex gap-2 items-center">
            <Slider
              valueVisible={!showInput}
              min={0}
              max={100}
              step={1}
              value={[blur]}
              onValueChange={(value) => setConfig({ ...config, blur: value[0] })}
            />
            {showInput && (
            <div className="w-[100px]">
              <Input type="number" value={blur} onChange={(e) =>
                setConfig({ ...config, blur: Number(e.target.value) })
              } />
            </div>
            )}
          </div>
        </div>

        {/* Spread */}
        {showSpread && (
          <div className="mb-2">
            <div className="text-xs font-bold">Spread</div>
            <div className="flex gap-2 items-center">
              <Slider
                valueVisible={!showInput}
                min={-50}
                max={50}
                step={1}
                value={[spread]}
                onValueChange={(value) => setConfig({ ...config, spread: value[0] })}
              />
              {showInput && (
              <div className="w-[100px]">
                <Input type="number" value={spread} onChange={(e) =>
                  setConfig({ ...config, spread: Number(e.target.value) })
                } />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Color */}
        <div>
          <div className="text-xs font-bold mb-1">Color</div>
          <ColorInput
            value={shadowColor}
            onChange={(color) => setConfig({ ...config, shadowColor: color })}
          />
        </div>

      </div>
    </div> 
  );
};

export default BoxShadow;
