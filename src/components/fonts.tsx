import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* radioland */
      @font-face {
        font-family: 'Radioland';
        font-style: normal;
        font-weight: 700;
        src: local('radioland'), url('./src/fonts/radioland.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'xNineSegments';
        font-style: normal;
        font-weight: 700;
        src: local('lcd-x-nine-segments'), url('./src/fonts/lcd-x-nine-segments.ttf');
        font-display: swap;
      }
      @font-face {
        font-family: 'fourSegments';
        font-style: normal;
        font-weight: 700;
        src: local('four-segments'), url('./src/fonts/four-segments.ttf');
      }
      `}
  />
);

export default Fonts;
