 export const enableExtraListeners = (canvas, updateActiveElementprops) => {
  canvas.on("object:added", () => {
    updateActiveElementprops()
  })
  canvas.on("object:removed", () => {
    updateActiveElementprops()
  }) 
  canvas.on("selection:updated", () => {
    updateActiveElementprops()
  });
  canvas.on("selection:cleared", () => {
    updateActiveElementprops()
  });
  canvas.on("selection:created", () => {
    updateActiveElementprops()
  }) 
};
