import { FC, useEffect, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import roundedClock from "../../images/roundedClock.png";

import Props from "./clockProps";

interface Clock {
  hh: number;
  mm: number;
  ss: number;
}

const RoundedClock: FC<Props> = (props: Props) => {
  const [clock, setClock] = useState<Clock>({ hh: 0, mm: 0, ss: 0 });

  useEffect(() => {
    setClock({
      hh: props.date.getHours() * 30,
      mm: props.date.getMinutes() * 6,
      ss: props.date.getSeconds() * 6,
    });
  }, [props.date]);

  return (
    <Stack
      w="350px"
      h="350px"
      justifyContent="center"
      alignItems="center"
      backgroundImage={roundedClock}
      backgroundColor="gray.200"
      backgroundSize="cover"
      border={`1px solid ${props.shadow}`}
      borderRadius="50%"
      boxShadow="0 -15px 15px rgba(255,255,255,0.05), inset 0 -15px 15px rgba(255,255,255,0.05), 0 15px 15px rgba(0,0,0,0.3), inset 0 15px 15px rgba(0,0,0,0.3)"
      _before={{
        content: '""',
        position: "absolute",
        width: "15px",
        height: "15px",
        background: "#fff",
        borderRadius: "50%",
        borderColor: "gray.400",
        borderWidth: "2px",
        zIndex: "1000",
      }}
    >
      {/* hour */}
      <Box width="160px" height="160px" position="absolute">
        {/* hr */}
        <Stack
          direction="row"
          position="absolute"
          justifyContent="center"
          width="160px"
          height="160px"
          _before={{
            content: '""',
            position: "absolute",
            width: "8px",
            height: "80px",
            background: "#ff105e",
            zIndex: "10",
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 0 4px #111",
          }}
          transform={`rotateZ(${clock.hh + clock.mm / 12}deg)`}
        ></Stack>
      </Box>
      {/* min */}
      <Box width="190px" height="190px" position="absolute">
        {/* mn */}
        <Stack
          direction="row"
          position="absolute"
          justifyContent="center"
          width="190px"
          height="190px"
          _before={{
            content: '""',
            position: "absolute",
            width: "6px",
            height: "95px",
            background: "#fff",
            zIndex: "11",
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 0 4px #111",
          }}
          transform={`rotateZ(${clock.mm}deg)`}
        ></Stack>
      </Box>
      {/* sec */}
      <Box width="230px" height="230px" position="absolute">
        {/* sc */}
        <Stack
          direction="row"
          position="absolute"
          justifyContent="center"
          width="230px"
          height="230px"
          _before={{
            content: '""',
            position: "absolute",
            width: "2px",
            height: "150px",
            background: "#3182CE",
            zIndex: "12",
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 0 4px #111",
          }}
          transform={`rotateZ(${clock.ss}deg)`}
        ></Stack>
      </Box>
    </Stack>
  );
};

export default RoundedClock;
