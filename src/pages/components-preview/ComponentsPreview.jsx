import ColorInput from "@/components/ui/custom/color-input";
import GradientContainer from "@/components/ui/custom/gradient-container";
import BoxShadowWithInput from "@/components/ui/custom/box-shadow";
import Dropdown from "@/components/ui/custom/dropdown";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquareX } from "lucide-react";

function ComponentsPreview() {
  const [color, setColor] = useState("rgba(206,141,60,0.61)");
  const [logs, setLogs] = useState([]);
  const [selectedControl, setSelectedControl] = useState("shadow");

  const addLog = (message) => {
    setLogs((prevLogs) => [
      { message, timestamp: new Date().toLocaleTimeString() },
      ...prevLogs,
    ]);
  };

  return (
    <div className="flex flex-col mt-4 md:flex-row p-3 md:p-5 gap-4">
      {/* Controls + dropdown */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        {/* Dropdown selector */}
      <label className="block text-sm font-medium">Select Control</label>
        <Dropdown
          placeHolder={"Placeholder"}
          value={selectedControl}
          options={[
            {
              name: "Gradient Container",
              value: "gradient",
            },
            {
              name:  "Color Input",
              value:  "color",
            },
            {
              name:  "Box Shadow",
              value:  "shadow",
            },
            {
              name:  "New Button",
              value:  "button",
            },
          ]}
          onValueChange={(value) => {
            setLogs([])
            setSelectedControl(value)
          }}
        />
        {/* Conditional Render */}
        {selectedControl === "gradient" && (
          <div className="shadow border border-amber-50 w-full md:w-[200px]">
            <div className="p-2">
              <GradientContainer
                showSiteColorBtn={false}
                canChooseGradientType={true}
                value={color}
                previewWidth={200}
                label="GradientContainer Label"
                onFocus={() => addLog(`onFocus: ()`)}
                onBlur={() => addLog(`onBlur: ()`)}
                showInPopup={false}
                opt={{ showInput: true }}
                isGradientAllowed={true}
                containerClass={"gradient"}
                onValueChange={(gradientText, rawConfig) => {
                  if (rawConfig?.colorStops) {
                    addLog(
                      `onChange: (${gradientText}, { colorStops:${JSON.stringify(
                        rawConfig.colorStops
                      )}, type: ${rawConfig.type}, angle: ${rawConfig.angle} })`
                    );
                  } else {
                    addLog(`onChange: (${gradientText})`);
                  }
                  setColor(gradientText);
                }}
              />
            </div>
          </div>
        )}

        {selectedControl === "color" && (
          <div className="shadow border border-amber-50 w-full md:w-[200px]">
            <div className="p-2">
              <ColorInput
                label="ColorInput Label"
                value={color}
                onChange={(color) => {
                  addLog(`onChange: (${color})`);
                  setColor(color);
                }}
              />
            </div>
          </div>
        )}

        {selectedControl === "shadow" && (
          <div className="shadow border border-amber-50 w-full md:w-[200px]">
            <div className="p-2">
              <BoxShadowWithInput
                label="Box Shadow With Input"
                showPreview={true}
                value="#606060 0px 0px 5px"
                containerClass={"box-shadow"}
                showCopyClipboard={true}
                showSpread={true}
                showTypeButton={true}
                onChange={(e) => {addLog(`onChange: (value: ${e})`)}}
              />
            </div>
          </div>
        )}

        {selectedControl === "button" && (
          <div className="">
            <Button
              className="flex group relative p-4 w-full"
              onClick={() => addLog(`onClick callback`)}
            >
              New Button
              <span className="absolute inset-x-0 bottom-[-2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px]"></span>
              <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-[5px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] blur-sm"></span>
            </Button>
          </div>
        )}
                <div className="flex flex-col gap-2 items-center shadow w-full md:w-[200px] p-2">
          <p>Output: </p>
          <div className="w-[75px] h-[75px] border border-slate-800" style={{ background: color }}></div>
          <p className="px-2 text-center break-words">{color}</p>
        </div>
      </div>

      {/* Output and Event logs */}
        <div className="">
          <div className="flex justify-between items-center">
            <p>Event Log:</p>
            <Button
              className="flex items-center gap-2 my-2 hover:bg-red-500 hover:text-amber-50"
              onClick={() => setLogs([])}
            >
              Clear Logs <SquareX />
            </Button>
          </div>

          <ul className="m-0 p-0 list-none text-sm break-all resize overflow-auto slim-scroll max-w-[1000px] min-h-[200px] max-h-[500px] w-full shadow px-2 py-2">
            {logs.map((log, idx) => (
              <li key={idx}>[{log.timestamp}] {log.message}</li>
            ))}
          </ul>
        </div>
      
    </div>
  );
}

export default ComponentsPreview;
