import RectangleControls from "./Controls/rectControls";
import CircleControls from "./Controls/circleControls";
import TextControls from "./Controls/textControls";
import ImageControls from "./Controls/imageFitControl";
import TriangleControls from "./Controls/triangleControls";

export const controlMap = {
  rect: RectangleControls,
  circle: CircleControls,
  "i-text": TextControls,
  image: ImageControls,
  triangle: TriangleControls,
};
