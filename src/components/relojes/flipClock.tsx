import { useEffect, useState } from "react";
import { Box, Stack, chakra, keyframes } from "@chakra-ui/react";

import Props from "./clockProps";

const StackBackVisivilityHidden = chakra(Box, {
  baseStyle: {
    display:"flex",
    direction: "row",
    justifyContent: "center",
    position: "absolute",
    left: "0",
    width: "100%",
    height: "50%",
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },
});

const StackFold = chakra(StackBackVisivilityHidden, {
  baseStyle: {
    top: "0%",
    alignItems: "flex-end",
    transformOrigin: "50% 100%",
    transform: "rotateX(0deg)",
    backgroundColor: "#171923",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    border: "0.5px solid whitesmoke",
    borderBottom: "0.5px solid whitesmoke",
    transformStyle: "preserve-3d",
  },
});

const StackUnfold = chakra(StackBackVisivilityHidden, {
  baseStyle: {
    top: "50%",
    alignItems: "flex-start",
    transformOrigin: "50% 0%",
    transform: "rotateX(180deg)",
    backgroundColor: "#171923",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    border: "0.5px solid whitesmoke",
    borderTop: "0.5px solid whitesmoke",
    transformStyle: "preserve-3d",
  },
});

const fold = keyframes`
  0%{
    transform: rotateX(0deg);
  }
  100%{
    transform: rotateX(-180deg);
  }
  `;

const unfold = keyframes`
  0%{
    transform: rotateX(180deg);
  }
  100%{
    transform: rotateX(0deg);
  }
  `;

function AnimatedCard(props: { animation: string; digit: any }) {
  return (
    <>
      {props.animation === "fold" ? (
        <StackFold
          animation={`${fold} 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards`}
        >
          <chakra.span fontSize="5em" transform="translateY(50%)" color="white">
            {props.digit}
          </chakra.span>
        </StackFold>
      ) : (
        <StackUnfold
          animation={`${unfold} 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards`}
        >
          <chakra.span
            fontSize="5em"
            transform="translateY(-50%)"
            color="white"
          >
            {props.digit}
          </chakra.span>
        </StackUnfold>
      )}
    </>
  );
}

const Card = chakra(Box, {
  baseStyle: {
    display:"flex",
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    overflow: "hidden",
    border: "1px solid whitesmoke",
  },
});

function StaticCard(props: { position: string; digit: any }) {
  if (props.position === "upperCard") {
    return (
      <Card
        alignItems="flex-end"
        borderBottom="0.5px solid whitesmoke"
        borderTopLeftRadius="3px"
        borderTopRightRadius="3px"
      >
        <chakra.span fontSize="5em" transform="translateY(50%)" color="white">
          {props.digit}
        </chakra.span>
      </Card>
    );
  } else {
    return (
      <Card
        alignItems="flex-start"
        borderTop="0.5px solid whitesmoke"
        borderBottomLeftRadius="3px"
        borderBottomRightRadius="3px"
      >
        <chakra.span fontSize="5em" transform="translateY(-50%)" color="white">
          {props.digit}
        </chakra.span>
      </Card>
    );
  }
}

const FlipContainer = chakra(Box, {
  baseStyle: {
    display: "block",
    position: "relative",
    width: "140px",
    height: "120px",
    perspectiveOrigin: "50% 50%",
    perspective: "300px",
    backgroundColor: "#171923",
    borderRadius: "5px",
  },
});

function FlipUnitContainer(props: {
  digit: number;
  shuffle: boolean;
  unit: string;
  shadow: string;
}) {
  let currentDigit: any = props.digit;
  let previousDigit: any = props.digit - 1;

  if (props.unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  const digit1 = props.shuffle ? previousDigit : currentDigit;
  const digit2 = !props.shuffle ? previousDigit : currentDigit;

  const animation1 = props.shuffle ? "fold" : "unfold";
  const animation2 = !props.shuffle ? "fold" : "unfold";

  return (
    <FlipContainer boxShadow={`0px 10px 10px 1px ${props.shadow}`}>
      <StaticCard position={"upperCard"} digit={currentDigit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </FlipContainer>
  );
}

function FlipClock(props: Props) {
  const [hours, setHours] = useState({ hh: 0, hhShuffle: true });
  const [minutes, setMinutes] = useState({ mm: 0, mmShuffle: true });
  const [seconds, setSeconds] = useState({ ss: 0, ssShuffle: true });

  useEffect(() => {
    const hh = props.date.getHours();
    const mm = props.date.getMinutes();
    const ss = props.date.getSeconds();

    if (hh !== hours.hh) {
      const hhShuffle = !hours.hhShuffle;
      setHours({
        hh: hh,
        hhShuffle: hhShuffle,
      });
    }

    if (mm !== minutes.mm) {
      const mmShuffle = !minutes.mmShuffle;
      setMinutes({ mm: mm, mmShuffle: mmShuffle });
    }

    if (ss !== seconds.ss) {
      const ssShuffle = !seconds.ssShuffle;
      setSeconds({
        ss: ss,
        ssShuffle: ssShuffle,
      });
    }
  }, [props.date]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="500px"
      boxSizing="border-box"
    >
      <FlipUnitContainer
        unit={"hours"}
        shuffle={hours.hhShuffle}
        digit={hours.hh}
        shadow={props.shadow}
      />
      <FlipUnitContainer
        unit={"minutes"}
        shuffle={minutes.mmShuffle}
        digit={minutes.mm}
        shadow={props.shadow}
      />
      <FlipUnitContainer
        unit={"seconds"}
        shuffle={seconds.ssShuffle}
        digit={seconds.ss}
        shadow={props.shadow}
      />
    </Stack>
  );
}

export default FlipClock;