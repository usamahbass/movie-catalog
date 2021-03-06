import {
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Sun as SunIcon, Moon as MoonIcon } from "react-feather";

const ThemeToggle = () => {
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const text = useColorModeValue("dark", "light");
  const { toggleColorMode: toggleMode } = useColorMode();

  return (
    <Tooltip hasArrow label="Ganti tema" placement="bottom">
      <IconButton
        position="fixed"
        bottom="3rem"
        right="3rem"
        size="sm"
        fontSize="lg"
        zIndex="999999999"
        aria-label={`Ganti ke ${text} mode`}
        title={`Ganti ke ${text} mode`}
        variant="ghost"
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
