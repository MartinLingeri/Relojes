import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const fonts = {
  body: `'BlinkMacSystemFont','Inter', 'Helvetica Neue', sans-serif`,
  radioland: `'Radioland', sans-serif`,
  xNineSegments: `'xNineSegments', sans-serif`,
  fourSegments: `'fourSegments',sans-serif`,
};

const customTheme = extendTheme({
  config,
  fonts,
});

export default customTheme;
