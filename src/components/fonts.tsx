import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* radioland */
      @font-face {
        font-family: 'Radioland';
        font-style: normal;
        font-weight: 700;
        src: url('./src/fonts/radioland.ttf') format('truetype');
      }
      @font-face {
        font-family: 'xNineSegments';
        font-style: normal;
        font-weight: 700;
        src: url('./src/fonts/lcd-x-nine-segments.ttf') format('truetype');
      }
      @font-face {
        font-family: 'fourSegments';
        font-style: normal;
        font-weight: 700;
        src: url('./src/fonts/four-segments.ttf') format('truetype');
      }
      `}
  />
)

export default Fonts