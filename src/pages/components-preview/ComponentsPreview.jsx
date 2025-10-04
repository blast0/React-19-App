import ColorInput from "@/components/ui/custom/color-input";
import GradientContainer from "@/components/ui/custom/gradient-container";
import BoxShadowWithInput from "@/components/ui/custom/box-shadow";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquareX } from "lucide-react";

function ComponentsPreview() {
  const [color, setColor] = useState("#000");
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [
      { message, timestamp: new Date().toLocaleTimeString() },
      ...prevLogs,
    ]);
  };
  return (
    <div className="flex p-5">
      <div className="flex flex-col gap-2">
        <div className="shadow resize-x overflow-auto h-[150px] w-[250px] min-w-[120px]">
          <p className="text-2xl mx-2">Gradient Container:</p>
          <div className="p-2 box-border">
            <GradientContainer
              showSiteColorBtn={false}
              canChooseGradientType={true}
              value={color}
              previewWidth={200}
              label="GradientContainer Label"
              onFocus={() => {
                addLog(`onFocus: ()`);
              }}
              onBlur={() => {
                addLog(`onBlur: ()`);
              }}
              showInPopup={false}
              opt={{ showInput: true }}
              isGradientAllowed={true}
              containerClass={"gradient"}
              onValueChange={(gradientText, rawConfig) => {
                if (rawConfig?.colorStops) {
                  addLog(
                    `onChange: (${gradientText}, { colorStops:${JSON.stringify(
                      rawConfig.colorStops
                    )}, type: ${rawConfig.type}, angle: ${rawConfig.angle} } )`
                  );
                } else {
                  addLog(`onChange: (${gradientText})`);
                }
                setColor(gradientText);
              }}
            />
          </div>
        </div>
        <div className="shadow resize-x overflow-auto h-[150px] w-[250px] min-w-[120px]">
          <p className="text-2xl mx-2">Color Input:</p>
          <div className="p-2 box-border">
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
        <div className="shadow resize-x overflow-auto h-[150px] w-[250px] min-w-[120px]">
          <p className="text-2xl mx-2">BoxShadowWithInput:</p>
          <div className="p-2 box-border">
            <BoxShadowWithInput
              label="Box Shadow With Input"
              showPreview={true}
              value="#606060 0px 0px 5px"
              containerClass={"box-shadow"}
              showCopyClipboard={true}
              showSpread={true}
              showTypeButton={true}
              onChange={(e) => {
                // handleShadow(e, canvas);
              }}
            />
          </div>
        </div>
      </div>

      <div className="resize overflow-auto mx-2 h-[150px] slim-scroll min-h-[100px] min-w-[500px] shadow px-2 box-border">
        <div className="flex justify-between items-start">
          <p className="text-2xl">Event Log:</p>
          <Button
            className="flex items-center gap-2 my-2 hover:bg-red-500 hover:text-amber-50"
            onClick={() => {
              setLogs([]);
            }}
          >
            Clear Logs
            <SquareX />
          </Button>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {logs.map((log, idx) => (
            <li key={idx}>
              [{log.timestamp}] {log.message}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="flex flex-col gap-2 items-center justify-start shadow"
        style={{ width: "200px" }}
      >
        <p className="text-2xl mx-2">Output: </p>

        <div
          className="w-[75px] h-[75px] border border-slate-800"
          style={{
            background: color,
          }}
        ></div>
        <p className="px-2 text-center">{color}</p>
      </div>
    </div>
  );
}

export default ComponentsPreview;
