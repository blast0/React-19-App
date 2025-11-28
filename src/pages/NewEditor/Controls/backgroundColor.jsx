import ColorInput from "@/components/ui/custom/color-input";

const BackgroundColorControl = ({
  canvas,
  activeElementProps,
  setActiveElementProps,
}) => {
  const selectedElement = canvas?.getActiveObject();
  if (!selectedElement) return "Selected Element not Found";
  else
    return (
      <ColorInput
        label="Background Color:"
        value={activeElementProps.backgroundColor}
        onChange={(color) => {
          selectedElement.set({ backgroundColor: color });
          canvas.renderAll();
          setActiveElementProps();
        }}
      />
    );
};

export default BackgroundColorControl;
