export const enableZoomAndPan = (canvas) => {
  canvas.on("mouse:wheel", function (opt) {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom() * (0.999 ** delta);
    zoom = Math.min(5, Math.max(zoom, 0.2));
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  let panning = false;

  canvas.on("mouse:down", (opt) => {
    if (opt.e.spaceKey || opt.e.button === 1) {
      panning = true;
      canvas.selection = false;
      canvas.setCursor("grab");
    }
  });

  canvas.on("mouse:move", (opt) => {
    if (panning) canvas.relativePan(new fabric.Point(opt.e.movementX, opt.e.movementY));
  });

  canvas.on("mouse:up", () => {
    panning = false;
    canvas.selection = true;
    canvas.setCursor("default");
  });

  document.addEventListener("keydown", (e) => (e.key === " " ? (e.spaceKey = true) : null));
  document.addEventListener("keyup", (e) => (e.key === " " ? (e.spaceKey = false) : null));
};
