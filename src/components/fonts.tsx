import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* radioland */
      @font-face {
        font-family: 'Radioland';
        font-style: normal;
        font-weight: 700;
        src: url('./fonts/radioland.ttf') format('truetype');
        font-display: swap;
      }
      @font-face {
        font-family: 'xNineSegments';
        font-style: normal;
        font-weight: 700;
        src: url('./fonts/lcd-x-nine-segments.ttf') format('truetype');
        font-display: swap;
      }
      @font-face {
        font-family: 'fourSegments';
        font-style: normal;
        font-weight: 700;
        src: url('./fonts/four-segments.ttf') format('truetype');
      }
      
      `}
  />
);

export default Fonts;
