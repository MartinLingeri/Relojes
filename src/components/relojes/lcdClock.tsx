import { FC } from "react";
import { Box } from "@chakra-ui/react";

import Props from "./clockProps";

const LcdClock: FC<Props> = (props: Props) => {
  return (
    <Box fontFamily={props.font} fontSize={{ base: 54, md: 68 }}>
      {props.name === "Transparent" ? (
        <Box color="blackAlpha.800" textShadow={`2px 2px 2px ${props.shadow}`}>
          {props.date.toLocaleTimeString()}
        </Box>
      ) : (
        <Box
          backgroundColor={props.shadow}
          backgroundClip="text"
          color="transparent"
          textShadow="2px 2px 2px rgba(255, 255, 255, 0.8)"
        >
          {props.date.toLocaleTimeString()}
        </Box>
      )}
    </Box>
  );
};

export default LcdClock;
