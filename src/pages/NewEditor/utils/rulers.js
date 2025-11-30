export const drawRulers = (zoom, canvasWidth, canvasHeight) => {
  const top = document.getElementById("ruler-top");
  const left = document.getElementById("ruler-left");

  const tCtx = top.getContext("2d");
  const lCtx = left.getContext("2d");

  top.width = canvasWidth;
  top.height = 30;
  left.width = 30;
  left.height = canvasHeight;

  tCtx.fillStyle = "#999";
  for (let i = 0; i < top.width / zoom; i += 10) {
    const x = i * zoom;
    const h = i % 50 === 0 ? 20 : 10;
    tCtx.fillRect(x, 30 - h, 1, h);
  }

  lCtx.fillStyle = "#999";
  for (let i = 0; i < left.height / zoom; i += 10) {
    const y = i * zoom;
    const w = i % 50 === 0 ? 20 : 10;
    lCtx.fillRect(30 - w, y, w, 1);
  }
};
