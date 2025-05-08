import {
  Wand,
  Bold,
  Circle,
  FlipHorizontal2,
  FlipVertical2,
  Images,
  ImageUp,
  Italic,
  MessageCircle,
  MessageSquareQuote,
  Proportions,
  Slash,
  Spline,
  Square,
  SquareArrowDown,
  SquareArrowDownLeft,
  SquareArrowDownRight,
  SquareArrowLeft,
  SquareArrowRight,
  SquareArrowUp,
  SquareArrowUpLeft,
  SquareArrowUpRight,
  SquareSquare,
  Strikethrough,
  Triangle,
  FileUp,
  TypeOutline,
  Underline,
  LaptopMinimal,
  AlignRight,
  AlignLeft,
  AlignCenter,
  Image,
  Component,
  RectangleHorizontal,
} from "lucide-react";
import { ACTIONS } from "./actions";

export const phoneIconSvgString = `<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M341.601,0H170.399c-29.292,0-53.121,23.828-53.121,53.121v405.756c0,29.292,23.83,53.123,53.121,53.123 h171.202c29.292,0,53.121-23.83,53.121-53.119V53.121C394.722,23.828,370.893,0,341.601,0z M234.91,453.434 c0-0.536,0.452-0.988,0.988-0.988H276.1c0.536,0,0.988,0.452,0.988,0.988v13.684c0,0.536-0.452,0.988-0.988,0.988h-40.202 c-0.536,0-0.988-0.452-0.988-0.988V453.434z M277.088,429.684c0,0.536-0.452,0.988-0.988,0.988h-40.202 c-0.536,0-0.988-0.452-0.988-0.988V416c0-0.534,0.452-0.984,0.988-0.984H276.1c0.536,0,0.988,0.45,0.988,0.984V429.684z M277.088,392.25c0,0.545-0.443,0.988-0.988,0.988h-40.202c-0.546,0-0.988-0.442-0.988-0.988v-13.68 c0-0.536,0.452-0.988,0.988-0.988H276.1c0.536,0,0.988,0.452,0.988,0.988V392.25z M255.999,351.476 c-13.461,0-24.414-10.951-24.414-24.412c0-13.462,10.953-24.416,24.414-24.416c13.463,0,24.416,10.953,24.416,24.416 C280.415,340.524,269.462,351.476,255.999,351.476z M170.397,36.304h171.202c10.004,0,18.142,8.137,18.142,18.144v225.136H152.257 V54.449C152.257,44.441,160.395,36.304,170.397,36.304z M211.35,315.983v22.162h-43.742l-13.906-22.162H211.35z M203.025,429.684 c0,0.536-0.452,0.988-0.986,0.988h-40.204c-0.534,0-0.986-0.452-0.986-0.988V416c0-0.542,0.443-0.984,0.986-0.984h40.204 c0.544,0,0.986,0.443,0.986,0.984V429.684z M203.025,392.25c0,0.545-0.442,0.988-0.986,0.988h-40.204 c-0.543,0-0.986-0.442-0.986-0.988v-13.68c0-0.536,0.452-0.988,0.986-0.988h40.204c0.534,0,0.986,0.452,0.986,0.988V392.25z M160.849,467.118v-13.684c0-0.536,0.452-0.988,0.986-0.988h40.204c0.534,0,0.986,0.452,0.986,0.988v13.684 c0,0.536-0.452,0.988-0.986,0.988h-40.204C161.302,468.106,160.849,467.654,160.849,467.118z M358.295,315.983l-13.905,22.162 h-43.742v-22.162H358.295z M351.151,429.684c0,0.536-0.452,0.988-0.988,0.988h-40.202c-0.536,0-0.988-0.452-0.988-0.988V416 c0-0.542,0.443-0.984,0.988-0.984h40.202c0.546,0,0.988,0.443,0.988,0.984V429.684z M351.151,392.25 c0,0.545-0.442,0.988-0.988,0.988h-40.202c-0.545,0-0.988-0.442-0.988-0.988v-13.68c0-0.536,0.452-0.988,0.988-0.988h40.202 c0.536,0,0.988,0.452,0.988,0.988V392.25z M308.973,467.118v-13.684c0-0.536,0.452-0.988,0.988-0.988h40.202 c0.536,0,0.988,0.452,0.988,0.988v13.684c0,0.536-0.452,0.988-0.988,0.988h-40.202 C309.425,468.106,308.973,467.654,308.973,467.118z"></path> </g> </g></svg>`;

export const githubIconSvgString = `<svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        version="1.1"
        >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-140.000000, -7559.000000)"
            fill="#ffffff"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                id="github-[#142]"
              ></path>
            </g>
          </g>
        </g>
        </svg>`;

export const webIconSvgString = `<svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <rect
            x="7.811"
            y="67.86"
            style="fill:#FFFFFF;"
            width="496.38"
            height="376.292"
          />
          <polyline
            style="fill:#027EA8;"
            points="183.945,260.003 183.945,147.917 408.116,147.917 408.116,260.003 183.945,260.003 "
          />
          <path
            style="fill:#84DCCF;"
            d="M448.305,285.218c-7.598,1.433-13.541,7.376-14.974,14.974l-1.778,9.422  c-3.247,5.411-11.09,5.411-14.337,0l-39.663-66.105c-2.42-4.035-1.785-9.199,1.542-12.526l0,0c3.327-3.327,8.492-3.963,12.526-1.542  l66.105,39.663c5.411,3.247,5.411,11.09,0,14.337L448.305,285.218z"
          />
          <rect
            x="7.811"
            y="67.86"
            style="fill:#E6E6E6;"
            width="80.061"
            height="376.292"
          />
          <rect
            x="47.841"
            y="147.915"
            style="fill:#FBB03B;"
            width="96.072"
            height="256.193"
          />
          <rect
            x="7.811"
            y="67.86"
            style="fill:#027EA8;"
            width="496.38"
            height="40.031"
          />
          <circle style="fill:#84DCCF;" cx="95.875" cy="227.981" r="48.031" />
          <rect
            x="32.092"
            y="100.301"
            style="fill:#F15A24;"
            width="15.622"
            height="15.622"
          />
          <rect
            x="63.334"
            y="100.301"
            style="fill:#FBB03B;"
            width="16.663"
            height="15.622"
          />
          <rect
            x="95.614"
            y="100.301"
            style="fill:#F15A24;"
            width="16.663"
            height="15.622"
          />
          <path d="M0,60.046v391.908h512V60.046H0z M15.622,436.332V75.668h480.757v24.638H127.903v15.622h368.476v320.406H15.622V436.332z" />
          <polygon points="368.085,267.814 176.134,267.814 176.134,140.106 415.927,140.106 415.927,219.972 400.305,219.972   400.305,155.728 191.755,155.728 191.755,252.192 368.085,252.192 " />
          <rect
            x="175.805"
            y="291.925"
            style="fill:#F15A24;"
            width="184.334"
            height="15.622"
          />
          <rect x="175.805" y="324.209" width="23.953" height="15.622" />
          <rect x="175.805" y="348.162" width="80.191" height="15.622" />
          <rect
            x="271.617"
            y="348.162"
            style="fill:#FBB03B;"
            width="40.616"
            height="15.622"
          />
          <rect x="327.854" y="348.162" width="80.191" height="15.622" />
          <rect
            x="175.805"
            y="372.115"
            style="fill:#84DCCF;"
            width="119.765"
            height="15.622"
          />
          <rect x="175.805" y="396.068" width="176.003" height="15.622" />
          <path d="M40.031,140.106v271.817h111.695V140.106H40.031z M136.104,396.303H55.652V266.659  c10.168,10.57,24.437,17.167,40.226,17.167s30.058-6.596,40.225-17.167V396.303z M55.652,227.979  c0-22.181,18.045-40.225,40.226-40.225c22.181,0,40.225,18.045,40.225,40.225s-18.045,40.225-40.225,40.225  C73.697,268.204,55.652,250.159,55.652,227.979z M95.878,172.132c-15.789,0-30.059,6.597-40.226,17.167v-33.57h80.452v33.57  C125.937,178.728,111.668,172.132,95.878,172.132z" />
          <path d="M424.385,321.483c-5.733,0-10.916-2.935-13.866-7.85l-39.664-66.105c-4.272-7.121-3.154-16.195,2.716-22.067  c5.875-5.874,14.948-6.989,22.069-2.717l66.104,39.663c4.917,2.949,7.851,8.134,7.851,13.867c0,5.732-2.935,10.916-7.85,13.867  l-1.198,0.719l-10.796,2.037c-4.47,0.844-7.902,4.276-8.746,8.746l-2.037,10.794l-0.719,1.198  C435.301,318.548,430.117,321.483,424.385,321.483z M386.346,235.788c-0.632,0-1.256,0.245-1.728,0.717  c-0.794,0.794-0.945,2.021-0.367,2.985l39.663,66.104c0.055,0.092,0.144,0.241,0.399,0.263l1.342-7.115  c2.044-10.835,10.365-19.157,21.202-21.201l7.114-1.342c-0.023-0.256-0.172-0.345-0.265-0.4l-66.104-39.663  C387.212,235.904,386.778,235.788,386.346,235.788z" />
          <g>
            <rect
              x="71.665"
              y="363.784"
              style="fill:#FFFFFF;"
              width="47.906"
              height="15.622"
            />
            <rect
              x="71.665"
              y="300.256"
              style="fill:#FFFFFF;"
              width="47.906"
              height="15.622"
            />
          </g>
          <rect
            x="71.665"
            y="332.541"
            style="fill:#F15A24;"
            width="47.906"
            height="15.622"
          />
        </svg>`;

export const linkedInSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"/>
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"/>
              <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"/>
              <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"/>
              <defs>
              <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
              <stop stop-color="#B13589"/>
              <stop offset="0.79309" stop-color="#C62F94"/>
              <stop offset="1" stop-color="#8A3AC8"/>
              </radialGradient>
              <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
              <stop stop-color="#E0E8B7"/>
              <stop offset="0.444662" stop-color="#FB8A2E"/>
              <stop offset="0.71474" stop-color="#E2425C"/>
              <stop offset="1" stop-color="#E2425C" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
              <stop offset="0.156701" stop-color="#406ADC"/>
              <stop offset="0.467799" stop-color="#6A45BE"/>
              <stop offset="1" stop-color="#6A45BE" stop-opacity="0"/>
              </radialGradient>
              </defs>
              </svg>`;

export const TEXT_ALIGNMENT = [
  {
    title: "Align Left",
    icon: <AlignLeft />,
    bId: "left",
  },
  {
    title: "Align Center",
    icon: <AlignCenter />,
    bId: "center",
  },
  {
    title: "Align Right",
    icon: <AlignRight />,
    bId: "right",
  },
];

export const DELETE_OPTIONS = [
  {
    name: "Clear Page",
    icon: <LaptopMinimal />,
    value: ACTIONS.CLEAR_PAGE,
  },
  {
    name: "Selected Item",
    icon: <Wand />,
    value: ACTIONS.CLEAR_SELECTED_ITEM,
  },
];

export const OPEN_OPTIONS = [
  // {
  //   name: "Add Image from library",
  //   icon: <Images />,
  //   value: ACTIONS.ADD_FROM_LIBRARY,
  // },
  {
    name: "Add Image",
    tooltip: "Upload Image from Desktop",
    icon: <ImageUp />,
    value: ACTIONS.UPLOAD_SVG,
  },
  {
    name: "Open Image",
    icon: <ImageUp />,
    value: ACTIONS.IMAGE_DATA,
  },
  {
    name: "Open Template From File",
    icon: <FileUp />,
    value: ACTIONS.RAW_DATA,
  },
  // {
  //   name: "Custom Size",
  //   icon: <Proportions />,
  //   value: ACTIONS.OTHERS,
  // },
];

export const ADD_SHAPE_OPTIONS = [
  {
    name: "Add Text",
    icon: <TypeOutline />,
    value: ACTIONS.ADD_TEXT,
  },
  {
    name: "Add Triangle",
    icon: <Triangle />,
    value: ACTIONS.ADD_TRIANGLE,
  },
  {
    name: "Add Rectangle",
    icon: <Square />,
    value: ACTIONS.ADD_RECTANGLE,
  },
  {
    name: "Add Circle",
    icon: <Circle />,
    value: ACTIONS.ADD_CIRCLE,
  },
  {
    name: "Add Solid Line",
    icon: <Slash />,
    value: ACTIONS.ADD_LINE,
  },
  {
    name: "Add Arrow",
    icon: <Spline />,
    value: ACTIONS.ADD_QUADRATIC_CURVE,
  },
  {
    name: "Add Speech Bubble",
    icon: <MessageSquareQuote />,
    value: ACTIONS.ADD_SPEECH_BUBBLE,
  },
  {
    name: "Add Label",
    icon: <MessageCircle />,
    value: ACTIONS.ADD_SPEECH_LABEL,
  },
];

export const ELEMENT_POSITION_OPTIONS = [
  {
    title: "Align Top Left",
    icon: <SquareArrowUpLeft size={25} />,
    bId: "Top-Left",
  },
  {
    title: "Align Top Center",
    icon: <SquareArrowUp size={25} />,
    bId: "Top-Center",
  },
  {
    title: "Align Top Right",
    icon: <SquareArrowUpRight size={25} />,
    bId: "Top-Right",
  },
  {
    title: "Align Center Left",
    icon: <SquareArrowLeft size={25} />,
    bId: "Center-Left",
  },
  {
    title: "Align Center Middle",
    icon: <SquareSquare size={25} />,
    bId: "Center",
  },
  {
    title: "Align Center Right",
    icon: <SquareArrowRight size={25} />,
    bId: "Center-Right",
  },
  {
    title: "Align Bottom Left",
    icon: <SquareArrowDownLeft size={25} />,
    bId: "Bottom-Left",
  },
  {
    title: "Align Bottom Center",
    icon: <SquareArrowDown size={25} />,
    bId: "Bottom-Center",
  },
  {
    title: "Align Bottom Right",
    icon: <SquareArrowDownRight size={25} />,
    bId: "Bottom-Right",
  },
];

export const FONT_STYLES = [
  {
    title: "Bold Toggle",
    value: "bold",
    icon: <Bold />,
  },
  {
    title: "Italic Toggle",
    value: "italic",
    icon: <Italic />,
  },
  {
    title: "Strikethrough Toggle",
    value: "strikethrough",
    icon: <Strikethrough />,
  },
  {
    title: "Underline Toggle",
    value: "underline",
    icon: <Underline />,
  },
];

export const FLIP_OPTIONS = [
  {
    title: "Flip Text Horizontally",
    icon: <FlipHorizontal2 />,
    value: "x",
  },
  {
    title: "Flip Text Vertically",
    icon: <FlipVertical2 />,
    value: "y",
  },
];

export const getObjectTypeIcon = (elem) => {
  if (elem?.customType) {
    switch (elem?.customType) {
      case "svg":
        return (
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>file_type_svg</title>
              <path
                d="M7.674,14.488a2.218,2.218,0,1,0,0,3.137H24.326a2.218,2.218,0,1,0,0-3.137Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M11.222,9.06A2.218,2.218,0,1,0,9,11.278L20.778,23.052A2.218,2.218,0,1,0,23,20.834Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M17.568,7.73a2.218,2.218,0,1,0-3.137,0V24.382a2.218,2.218,0,1,0,3.137,0Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M23,11.278A2.218,2.218,0,1,0,20.778,9.06L9,20.834a2.218,2.218,0,1,0,2.218,2.218Z"
                style="fill:#ffffff;stroke:#000000;stroke-width:3.73000001907349px"
              ></path>
              <path
                d="M7.674,14.488a2.218,2.218,0,1,0,0,3.137H24.326a2.218,2.218,0,1,0,0-3.137Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M11.222,9.06A2.218,2.218,0,1,0,9,11.278L20.778,23.052A2.218,2.218,0,1,0,23,20.834Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M17.568,7.73a2.218,2.218,0,1,0-3.137,0V24.382a2.218,2.218,0,1,0,3.137,0Z"
                style="fill:#ffffff"
              ></path>
              <path
                d="M23,11.278A2.218,2.218,0,1,0,20.778,9.06L9,20.834a2.218,2.218,0,1,0,2.218,2.218Z"
                style="fill:#ffffff"
              ></path>
              <path d="M2,16.056H30V25.95a4.035,4.035,0,0,1-4.106,4.106H6.106A4.035,4.035,0,0,1,2,25.95Z"></path>
              <path
                d="M6.2,23.045A3.628,3.628,0,1,1,12.4,20.48H10.27A1.5,1.5,0,1,0,7.7,21.541h0a1.6,1.6,0,0,0,1.062.441h0a4.118,4.118,0,0,1,2.566,1.063h0a3.628,3.628,0,1,1-6.194,2.565H7.264A1.5,1.5,0,1,0,9.83,24.55h0a1.948,1.948,0,0,0-1.063-.44h0A4.465,4.465,0,0,1,6.2,23.045Z"
                style="fill:#fff"
              ></path>
              <path
                d="M19.651,16.852,17.085,29.24H14.96L12.4,16.852H14.52l1.5,7.255,1.5-7.255Z"
                style="fill:#fff"
              ></path>
              <path
                d="M23.28,21.983h3.628v3.628h0a3.628,3.628,0,1,1-7.257,0h0V20.48h0a3.628,3.628,0,0,1,7.257,0H24.783a1.5,1.5,0,1,0-3.005,0v5.13h0a1.5,1.5,0,0,0,3.005,0h0v-1.5h-1.5V21.983Z"
                style="fill:#fff"
              ></path>
            </g>
          </svg>
        );
      case "Quadratic":
        return "icon-quad-arrow";
      case "customGroup":
        return <Component />;
      case "SpeechBubble":
        return elem?.isLabel ? "icon-engage" : "icon-random-communication";
      default:
        return "";
    }
  } else
    switch (elem?.type) {
      case "i-text":
        return <TypeOutline />;
      case "rect":
        return elem?.patternActive ? <Image /> : <RectangleHorizontal />;
      case "triangle":
        return elem?.patternActive ? <Image /> : <Triangle />;
      case "circle":
        return elem?.patternActive ? <Image /> : <Circle />;
      case "line":
        return elem.strokeDashArray.length === 0
          ? "icon-minus"
          : "icon-more-horizon";
      case "group":
        return <Component />;
      case "Image":
        return elem?.selectedTool ? "icon-blob" : <Image />;
      default:
        return "";
    }
};

export const getCanvasElementNames = (canvas) => {
  if (!canvas) return [];

  let data = [];
  const elements = canvas?.getObjects();
  if (elements?.length) {
    data = elements.map((elem) => {
      if (elem.type === "i-text") {
        if (elem.changedName === true) {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.customName === undefined || elem.customName === ""
                  ? elem.text
                  : elem.customName}
              </div>
            ),
            value: elem.id,
            nameValue:
              elem.name === undefined || elem.name === ""
                ? elem.text
                : elem.name,
          };
        } else {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.text.length > 30 ? elem.text.slice(0, 30) : elem.text}
              </div>
            ),
            value: elem.id,
            nameValue: elem.name
              ? elem.name
              : elem.text.length > 30
              ? elem.text.slice(0, 30)
              : elem.text,
          };
        }
      } else {
        if (elem?.id) {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.name}
              </div>
            ),
            nameValue: elem.name,
            value: elem.id,
          };
        } else {
          return {
            name: (
              <div className="flex gap-2 items-center">
                {getObjectTypeIcon(elem)}
                {elem.name}
              </div>
            ),
            value: elem.bubbleId,
            nameValue: elem.name,
          };
        }
      }
    });
    return data;
  } else {
    return [];
  }
};
