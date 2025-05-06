import {
  githubIconSvgString,
  linkedInSvgString,
  phoneIconSvgString,
  webIconSvgString,
} from "./designer-icons";

export const DefaultTemplate = {
  name: "Default Template",
  value: "default",
  pageStyles: {
    width: 1200,
    height: 640,
  },
  elements: [
    {
      type: "i-text",
      left: 26,
      top: 325,
      fill: "#372875",
      scaleX: 0.75,
      scaleY: 0.75,
      fontFamily: "Patua One",
      text: "Work Experience",
      underline: true,
      name: "Work Experience",
    },
    {
      type: "i-text",
      left: 800,
      top: 325,
      fill: "#372875",
      scaleX: 0.75,
      scaleY: 0.75,
      fontFamily: "Patua One",
      text: "Technical Skills",
      underline: true,
      name: "Technical Skills",
    },
    {
      type: "rect",
      left: 0,
      top: 0,
      width: 1200,
      height: 200,
      fill: "#3c4d6e",
      name: "Rectangle 1",
    },
    {
      type: "i-text",
      left: 30,
      top: 30,
      fill: "#ffffff",
      fontFamily: "Ubuntu",
      fontWeight: "bold",
      fontSize: 48,
      text: "BISHAL KUMAR",
      name: "BISHAL KUMAR",
    },
    {
      type: "rect",
      left: 0,
      top: 199,
      width: 1199,
      height: 120,
      fill: "#0a324d",
      selectable: true,
      id: 6,
      name: "Rectangle 2",
    },
    {
      type: "i-text",
      left: 33,
      top: 95,
      fill: "#ffffff",
      scaleX: 0.4,
      scaleY: 0.4,
      fontFamily: "Quicksand",
      text: "I'm a Full stack developer (MERN/MEAN) experienced in building beautiful and user-friendly web applications. \nMy expertise lies in developing scalable, maintainable, and modular code that adheres to industry standards, best practices and \nensures optimal performance. Aside from my technical skills, I'm also a team player and enjoy collaborating with others. \nI'm a quick learner, adaptable, and have a strong work ethic.",
    },
    {
      type: "svg",
      name: "linkedIn icon",
      left: 525,
      top: 240,
      width: 28,
      height: 28,
      svgStr: `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16" fill="none"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"/></svg>`,
    },
    {
      type: "i-text",
      left: 559,
      top: 247,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "https://www.linkedin.com/in/bishal-kumar-832398158",
    },
    {
      type: "svg",
      name: "github icon",
      left: 37,
      top: 238,
      width: 30,
      height: 30,
      svgStr: githubIconSvgString,
    },
    {
      type: "i-text",
      left: 77,
      top: 247,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "https://github.com/blast0",
    },
    {
      type: "svg",
      name: "linkedIn icon",
      left: 524,
      top: 272,
      width: 32,
      height: 32,
      svgStr: linkedInSvgString,
    },
    {
      type: "i-text",
      left: 560,
      top: 280,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "https://www.instagram.com/bishalkumar.war",
    },
    {
      type: "svg",
      name: "website icon",

      left: 520,
      top: 204,
      width: 35,
      height: 35,
      svgStr: webIconSvgString,
    },
    {
      type: "i-text",
      left: 560,
      top: 213,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "https://bishalkumar-sde.netlify.app",
    },
    {
      type: "svg",
      name: "Phone icon",
      left: 42,
      top: 278,
      width: 20,
      height: 35,
      svgStr: phoneIconSvgString,
    },
    {
      type: "i-text",
      left: 77,
      top: 290,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "+91-7635953963",
    },
    {
      type: "i-text",
      left: 25,
      top: 372,
      fill: "#000",
      scaleX: 0.47,
      scaleY: 0.47,
      fontFamily: "Quicksand",
      text: "Software Engineer",
      name: "Software Engineer",
    },
    {
      type: "i-text",
      left: 500,
      top: 370,
      fill: "#009688",
      scaleX: 0.4,
      scaleY: 0.4,
      fontFamily: "Quicksand",
      text: "08/2022 - Present",
      name: "date",
    },
    {
      type: "svg",
      name: "mail icon",
      left: 37,
      top: 204,
      width: 35,
      height: 35,
      svgStr: `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M915.953477 236.26461a33.013135 33.013135 0 0 0-23.414209-9.703361H130.820804c-8.474699 0-16.949398 3.235478-23.418305 9.703361-6.467884 6.467884-9.70029 14.939511-9.70029 23.41421V760.46318c0 8.474699 3.232406 16.946326 9.70029 23.41421s14.942582 9.703361 23.418305 9.703361h761.718464c8.471627 0 16.946326-3.235478 23.414209-9.703361s9.703361-14.939511 9.703361-23.41421V259.679844c0-8.475723-3.235478-16.94735-9.703361-23.415234z" fill="#27323A"/><path d="M833.933095 276.238117L510.189771 555.348233 189.035852 276.238117z" fill="#79CCBF"/><path d="M147.380101 305.863215L318.339258 454.444334 147.380101 691.768666z" fill="#FFFFFF"/><path d="M171.05233 743.903883l184.994577-256.732078L477.59131 592.801958c9.44227 8.213608 21.536404 12.806758 34.151695 12.806758a51.857744 51.857744 0 0 0 34.088214-12.806758l121.60686-105.630153 184.865567 256.732078H171.05233z" fill="#F4CE73"/><path d="M875.97997 691.768666L705.083271 454.444334l170.896699-148.581119z" fill="#FFFFFF"/></svg>`,
    },
    {
      type: "i-text",
      left: 77,
      top: 213,
      fill: "#ffffff",
      scaleX: 0.41,
      scaleY: 0.41,
      fontFamily: "Quicksand",
      text: "bishalkumar.sde@gmail.com",
      name: "bishalkumar.sde@gmail.com",
    },
    {
      type: "i-text",
      left: 25,
      top: 407,
      fill: "#000",
      scaleX: 0.4,
      scaleY: 0.4,
      fontFamily: "Quicksand",
      text: "Continuous fixes, improvements and features development to promote \nbetter component life-cycle and a linear and bug free product.\nImproved front-end performance by eliminating performance bottlenecks.\nCreated front-end modules with maximum code re-usability and efficiency. \nWorked with native modules as and when required.\nUsed native APIs for tight integrations.\nCreated embeddable script for any web application.\nMaintained software products including programs, webpages, and databases\nLanguages used: HTML | CSS | SCSS | LESS | JAVASCRIPT",
      name: "job summary",
    },
    {
      type: "Pattern",
      name: "Background Image",
      left: 1030,
      top: 22,
      width: 150,
      height: 150,
      // radius: 250,
      containerType: "rect", //triangle. circle, rect
      url: "https://www.bakemyweb.com/files/public/39/2c/677288c7c6f859001dc6392c/i/f9/67/6798d660f4957e001e97f967/original?name=canvas.png-200x200.png&mimetype=image/png&cd=inline",
      imageFit: "Fit Image",
      BorderX: 5,
      BorderY: 5,
      BorderLock: true,
      preselected: true,
      stopContainerResize: true,
    },
  ],
};

export const ARROW_DIRECTION = [
  {
    name: "Top",
    value: "Top",
  },
  {
    name: "Left",
    value: "Left",
  },
  {
    name: "Right",
    value: "Right",
  },
  {
    name: "Bottom",
    value: "Bottom",
  },
];

export const ALIGNMENT_OPTIONS = [
  {
    title: "Align Left",
    icon: "icon-align-object-left",
    bId: "left",
  },
  {
    title: "Align Center",
    icon: "icon-align-object-center",
    bId: "center",
  },
  {
    title: "Align Right",
    icon: "icon-align-object-right",
    bId: "right",
  },
  {
    title: "Align Top",
    icon: "icon-align-object-top",
    bId: "top",
  },
  {
    title: "Align Middle",
    icon: "icon-align-object-middle",
    bId: "middle",
  },
  {
    title: "Align Bottom",
    icon: "icon-align-object-bottom",
    bId: "bottom",
  },
];

export const SPEECH_TEXT_ALIGNMENT_OPTIONS = [
  {
    title: "Align Left",
    icon: "icon-align-object-left",
    bId: "left",
  },
  {
    title: "Align Center",
    icon: "icon-align-object-center",
    bId: "center",
  },
  {
    title: "Align Right",
    icon: "icon-align-object-right",
    bId: "right",
  },
];

export const CANVAS_CONTEXT_MENU_ITEMS = [
  { label: "Send Backwards", value: "sendBackwards" },
  { label: "Send To Back", value: "sendToBack" },
  { label: "Bring Forward", value: "bringForward" },
  { label: "Bring To Front", value: "bringToFront" },
  { label: "Group Selected", value: "group" },
  { label: "Ungroup Selected", value: "unGroup" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Delete", value: "delete" },
];

export const CANVAS_PAGE_GUTTER = 200;

export const PAGE_LAYOUTS = {
  print: {
    label: "Print",
    sizes: [
      { label: "A4", value: "A4", width: "595px", height: "842px" },
      { label: "A3", value: "A4", width: "842px", height: "1191px" },
      { label: "Letter", value: "letter", height: "612px", width: "791px" },
      { label: "Custom", value: "custom", height: "100%", width: "100%" },
    ],
  },
  googleAd: {
    label: "Google Ad",
    sizes: [
      { label: "300 x 300", value: "300", height: "300px", width: "300px" },
    ],
  },
};

export const PAGE_CONFIG = Object.freeze({
  id: "",
  orientation: "potrait",
  template: {},
  elements: [],
  style: {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    height: "",
    width: "",
  },
});

export const RESET_ACTIVE_ELEM_PROPS = {
  id: "",
  colors: [],
};

export const ARROW_HEAD = {
  LEFT_ARROW: "Left Arrow",
  RIGHT_ARROW: "Right Arrow",
  DOUBLE_SIDED: "Double Sided",
};

export const SHAPES_PROPS_DEFAULT = Object.freeze({
  fill: "rgba(196, 232, 188, 0.44)",
  stroke: "#000",
  strokeWidth: 1,
  // paintFirst: "stroke",
  backgroundColor: "rgba(0,0,0,0)",
});

export const LINE_PROPS_DEFAULT = Object.freeze({
  strokeWidth: 2,
  stroke: "#000",
});

export const ARROW_HEAD_POSITION = Object.freeze({
  fill: "#000",
  originX: "center",
  originY: "center",
});

export const QUADRATIC_PROPS_DEFAULT = Object.freeze({
  Path: {
    fill: "",
    stroke: "black",
    hasBorders: false,
    hasControls: false,
    objectCaching: false,
    name: "quad_curve",
    customType: "quad_curve",
    selectable: false,
  },
  CurvePoint: {
    originX: "center",
    originY: "center",
    hasBorders: false,
    hasControls: false,
    name: "quad_control",
    customType: "quad_control",
    visible: false,
    hoverCursor: "grab",
    moveCursor: "grabbing",
    scaleX: 0.4,
    scaleY: 0.4,
  },
  Arrow: {
    width: 8,
    height: 8,
    fill: "#000",
    stroke: "#000",
    strokeWidth: 2,
    originX: "center",
    originY: "bottom",
    line1: "",
    line2: "",
    line3: "",
    hasBorders: false,
    hasControls: false,
    name: "quad_arrow",
    customType: "quad_arrow",
  },
});

export const INITIAL_PATH = {
  p0: [50, 50],
  p1: [125, 75],
  p2: [150, 150],
  p3: [65, 100],
};

export const SPEECH_BUBBLE_DEFAULT_PROPS = Object.freeze({
  CONFIGURATION: {
    text: "Hello World!",
  },
  TEXT: {
    width: 180,
    fontFamily: "Quicksand",
    fontSize: 16,
    originY: "center",
    originX: "center",
    stroke: "red",
    objectCaching: false,
    textAlign: "center",
  },
  TAIL_RECT: {
    fill: "transparent",
    hasRotatingPoint: false,
    hasControls: false,
    originY: "center",
    originX: "right",
    width: 24,
    height: 24,
    stroke: "#000",
  },
  BUBBLE_BOX: {
    fill: "white",
    stroke: "#000",
    rx: 8,
    ry: 8,
    objectCaching: false,
  },
  POLYGON_TAIL: {
    fill: "white",
    stroke: "#000",
    objectCaching: false,
    strokeWidth: 2,
    hasBorders: false,
    hasControls: false,
  },
  BUBBLE_OVERLAY: {
    fill: "white",
    objectCaching: false,
    strokeWidth: 2,
    hasBorders: false,
    hasControls: false,
  },
});

export const POLY_POINTS = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
];

export const DeleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

export const svg =
  "M829.449,601.585L819.7,611.7a1,1,0,0,1-1.7-.713V604H804v13.962h6.933a1.071,1.071,0,0,1,.989.619,0.954,0.954,0,0,1-.239,1.09l-10.439,9.737a2,2,0,0,1-2.828-.021L788.3,619.66a1,1,0,0,1,.713-1.7H796V604H782v6.986a1,1,0,0,1-1.7.713l-9.748-10.115a2,2,0,0,1-.022-2.828l9.758-10.439a0.957,0.957,0,0,1,1.092-.239,1.073,1.073,0,0,1,.621.989V596h14V582.037h-6.986a1,1,0,0,1-.713-1.7l10.115-9.728a2,2,0,0,1,2.828-.022l10.439,9.738a0.954,0.954,0,0,1,.239,1.09,1.073,1.073,0,0,1-.989.619H804V596h14v-6.933a1.071,1.071,0,0,1,.621-0.989,0.957,0.957,0,0,1,1.092.239l9.758,10.439A2,2,0,0,1,829.449,601.585Z";

export const Ok =
  "M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z";

export const BlankTemplate = Object.freeze({
  name: "Blank Page",
  value: "blank",
  pageStyles: {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    width: 595,
    height: 842,
  },
  elements: [],
});

export const SPACE_EVENLY_OPTIONS = [
  {
    title: "Equally Space Horizontal",
    icon: "icon-space-evenly-horizontally",
    bId: "horizontal",
  },
  {
    title: "Equally Space Vertical",
    icon: "icon-space-evenly-vertically",
    bId: "vertical",
  },
];

export const ACCEPTED_FILES = ".svg, .png, .jpg, .jpeg, .webp, .gif";

export const PAGE_TEMPLATES = [BlankTemplate, DefaultTemplate];
