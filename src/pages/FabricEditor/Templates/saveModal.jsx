import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

const SaveModalJsx = ({
  defaultFileName,
  defaultFileType,
  imageWidth,
  ratio,
  canvas,
  onSave,
}) => {
  const [fileName, set_fileName] = useState(defaultFileName);
  const [chosenFileType, set_chosenFileType] = useState(defaultFileType);
  const [ImageWidth, set_ImageWidth] = useState(imageWidth);
  const [ImageHeight, set_ImageHeight] = useState(parseInt(imageWidth / ratio));
  const [imgQuality, set_jpegQuality] = useState(90);
  const [selection, setSelection] = useState("page");
  const btns = [
    {
      btnText: "PNG",
      value: "png",
    },
    {
      btnText: "JPEG",
      value: "jpeg",
    },
    {
      btnText: "WEBP",
      value: "webp",
    },
    {
      btnText: "SVG",
      value: "svg",
    },
  ];
  return (
    <>
      <div className="SaveDownloadModal p-2 modal-body">
        <Input
          autoFocus={true}
          value={fileName}
          onChange={(e) => {
            set_fileName(e.target.value);
          }}
          label="File Name:"
        />
        <div className="flex justify-between flex-col">
          <span className={`fileName ml-3 mb-2`}>
            {fileName}.{chosenFileType}
          </span>
          <div className="flex gap-[10px]">
            <div
              className="h-[120px] w-[200px] bg-white bg-contain bg-center bg-no-repeat border border-[#eee]"
              style={{
                backgroundImage: `url(${
                  selection === "page"
                    ? canvas.toDataURL()
                    : canvas.getActiveObject().toDataURL()
                })`,
              }}
            ></div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSelection("page");
                }}
              >
                <input
                  type="radio"
                  className={`cursor-pointer`}
                  checked={selection === "page"}
                />
                <Label className={`cursor-pointer`}>Full Page</Label>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSelection("selected");
                }}
              >
                <input
                  type="radio"
                  className={`cursor-pointer`}
                  checked={selection === "selected"}
                />
                <Label className={`cursor-pointer`}>Selected Element</Label>
              </div>
            </div>
          </div>

          <div className="text-alignment">
            <Label>Type:</Label>
            <div className="flex gap-0.5 mb-2">
              {btns.map((item) => (
                <Title key={item.value} title={item.value}>
                  <Button
                    type="button"
                    className={`cursor-pointer border ${
                      chosenFileType === item.value
                        ? "text-emerald-50 bg-emerald-600"
                        : ""
                    }`}
                    onClick={() => {
                      set_chosenFileType(item.value);
                    }}
                  >
                    {item.btnText}
                  </Button>
                </Title>
              ))}
            </div>
          </div>
          {chosenFileType === "jpeg" || chosenFileType === "webp" ? (
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <Label>Quality:</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[imgQuality]}
                unit={"%"}
                onValueChange={(value) => {
                  set_jpegQuality(value[0]);
                }}
                label={"Image Quality:"}
              />
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div className="w-[48%]">
              <Input
                autoFocus={true}
                type="number"
                value={ImageWidth}
                onChange={(e) => {
                  set_ImageWidth(parseInt(e.target.value));
                  set_ImageHeight(parseInt(e.target.value / ratio));
                }}
                label="Width:"
              />
            </div>
            <div className="w-[48%]">
              <Input
                autoFocus={true}
                type="number"
                value={ImageHeight}
                onChange={(e) => {
                  set_ImageWidth(parseInt(e.target.value * ratio));
                  set_ImageHeight(parseInt(e.target.value));
                }}
                label="Height:"
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        className="w-[100px] cursor-pointer"
        onClick={() => {
          // onSave();
          if (selection === "page") {
            const fileSVGData = canvas?.toDataURL({
              format: chosenFileType,
              quality: imgQuality / 100,
            });
            saveAs(fileSVGData, fileName + "." + chosenFileType);
          } else {
            const fileSVGData = canvas.getActiveObject()?.toDataURL({
              format: chosenFileType,
              quality: imgQuality / 100,
            });
            saveAs(fileSVGData, fileName + "." + chosenFileType);
          }
        }}
      >
        <span>
          <Download />
        </span>
        Download
      </Button>
    </>
  );
};

export default SaveModalJsx;
