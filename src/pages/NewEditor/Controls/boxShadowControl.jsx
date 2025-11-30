import BoxShadowWithInput from "@/components/ui/custom/box-shadow";
import { handleShadow } from "../helper";
const BoxShadowControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <div className="shadow-control">
        <BoxShadowWithInput
          label="Box Shadow:"
          showPreview={false}
          className="h-[36px]"
          value={
            selectedElement?.boxShadow
              ? selectedElement?.boxShadow
              : "#606060 0px 0px 5px"
          }
          containerClass={"box-shadow"}
          showCopyClipboard={false}
          showSpread={false}
          showTypeButton={false}
          onChange={(e) => {
            handleShadow(e, canvas);
          }}
        />
      </div>
    );
};

export default BoxShadowControl;
