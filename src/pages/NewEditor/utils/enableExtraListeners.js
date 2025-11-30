 export const enableExtraListeners = (canvas, updateActiveElementprops) => {
  canvas.on("object:added", () => {
    updateActiveElementprops()
  });
  
  canvas.on("selection:updated", () => {
    updateActiveElementprops()
  }); 
};
