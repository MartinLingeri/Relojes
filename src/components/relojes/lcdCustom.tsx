import { Box } from "@chakra-ui/react";
import LcdClock from "./lcdClock";

import Props from "./clockProps";

function LcdCustom(props: Props) {
  return (
    <Box>
      <LcdClock
        date={props.date}
        name={props.name}
        font={props.font}
        shadow={props.shadow}
      />
    </Box>
  );
}

export default LcdCustom;
