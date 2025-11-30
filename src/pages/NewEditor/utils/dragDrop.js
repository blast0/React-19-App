
export const enableDragDrop = (canvas, canvasCoreRef) => {
  const wrapper = document.getElementById("canvas-wrapper");
  wrapper.addEventListener("dragover", (e) => e.preventDefault());
  wrapper.addEventListener("drop", (e) => dropListener(e, canvas, canvasCoreRef));
  console.log(canvasCoreRef)
};

const dropListener= async (e, canvas, canvasCoreRef) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file) return;
  if(!file.type.match(/image|svg/)) {
    alert("Unsupported file type");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (event) => {
    const fileURL = event.target.result;
    let obj=null;
    if (file.type.includes("svg+xml") || file.name.endsWith(".svg")) {
      const svgText = await file.text();
      obj= await canvasCoreRef.getSvgFromString({
        svgStr: svgText,
        name: "Dropped SVG",
        top: 50,
        left: 50,
      });
    }
    else if (file.type.includes("image")) {
     obj= await canvasCoreRef.addImgFromURL(fileURL, {
        left: 100,
        top: 100,
        selectable: true,
      });
      // Get canvas dimensions
    }  
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    // Get SVG original dimensions
    const bounds = obj.getBoundingRect();
    const { width, height } = bounds;

    // Max allowed size (75% of canvas)
    const maxWidth = canvasWidth * 0.75;
    const maxHeight = canvasHeight * 0.75;

    // Determine scale factor
    let scale = 1;
    if (width > maxWidth || height > maxHeight) {
      scale = Math.min(maxWidth / width, maxHeight / height);
    }
    // Apply proportional scale
    obj.scale(scale);

    canvas.add(obj);
    canvas.centerObject(obj);
    canvas.renderAll();
    console.log(fileURL)
  }
  reader.readAsDataURL(file);
}