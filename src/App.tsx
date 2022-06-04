import { useState, useEffect } from "react";
import { Stack, Box, Select, useColorMode } from "@chakra-ui/react";
import RoundedClock from "./components/relojes/roundedClock";
import RadiolandClock from "./components/relojes/radiolandClock";
import XNineSegmentsClock from "./components/relojes/xNineSegmentsClock";
import FourSegmentsClock from "./components/relojes/fourSegmentsClock";

import relojes from "./relojes";
import bgColors from "./bgColors";

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: number;
  type: string;
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [date, setDate] = useState<Date>(() => new Date());
  const [clock, setClock] = useState<string>(relojes[0].component);
  const [bgColor, setBgColor] = useState<string>(bgColors[0].color);
  const [bgColorName, setBgColorName] = useState<string>(bgColors[0].name);
  const [bgShadow, setBgShadow] = useState<string>(bgColors[0].shadow);
  const [optionColor, setOptionColor] = useState<string>("");

  const componente = "XNineSegment";

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    colorMode === "light" ? setOptionColor("black") : setOptionColor("white");
  }, [colorMode]);

  function handleSelectedClockOption(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    setClock(target.value);
  }

  function handleSelectedBgColorOption(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    setBgColorName(target.value);
    setBgColor(
      bgColors.find((c) => c.name === target.value)?.color || "gray.800"
    );
    setBgShadow(
      bgColors.find((c) => c.name === target.value)?.shadow || "blackAlpha.900"
    );
  }

  return (
    <Stack
      alignItems="center"
      w="100%"
      h="100vh"
      paddingTop={16}
      gap={24}
      backgroundColor={bgColor}
    >
      <Stack w={{ base: "70%", lg: "50%" }} gap={2}>
        <Select
          focusBorderColor="blue.300"
          borderWidth={2}
          borderColor="gray.300"
          bg="gray.300"
          color="gray.700"
          value={clock}
          onChange={handleSelectedClockOption}
        >
          {relojes.map((r) => {
            return (
              <option
                key={r.name}
                value={r.component}
                style={{ color: `${optionColor}` }}
              >
                {r.name}
              </option>
            );
          })}
        </Select>
        <Select
          focusBorderColor="blue.300"
          borderWidth={2}
          borderColor="gray.300"
          bg="gray.300"
          color="gray.700"
          value={bgColorName}
          onChange={handleSelectedBgColorOption}
        >
          {bgColors.map((c) => {
            return (
              <option
                key={c.name}
                value={c.name}
                style={{ color: `${optionColor}` }}
              >
                {c.name}
              </option>
            );
          })}
        </Select>
      </Stack>
      <Box p="auto">
        {clock === "RoundedClock" && (
          <RoundedClock date={date} name={bgColorName} shadow={bgShadow} />
        )}
        {clock === "RadiolandClock" && (
          <RadiolandClock date={date} name={bgColorName} shadow={bgShadow} />
        )}
        {clock === "XNineSegmentsClock" && (
          <XNineSegmentsClock
            date={date}
            name={bgColorName}
            shadow={bgShadow}
          />
        )}
        {clock === "FourSegmentsClock" && (
          <FourSegmentsClock date={date} name={bgColorName} shadow={bgShadow} />
        )}
      </Box>
    </Stack>
  );
}

export default App;
