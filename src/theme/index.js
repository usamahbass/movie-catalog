import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Fonts } from "./collects/font";
import { overrides } from "./overrides";

const theme = extendTheme(overrides);

export const ThemeApp = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {children}
    </ChakraProvider>
  );
};

ThemeApp.propTypes = {
  children: PropTypes.node,
};
