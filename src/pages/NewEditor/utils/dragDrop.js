export const enableDragDrop = (canvas) => {
  const wrapper = document.getElementById("canvas-wrapper");
  wrapper.addEventListener("dragover", (e) => e.preventDefault());
  wrapper.addEventListener("drop", (e) => dropListener(e, canvas));
};
