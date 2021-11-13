import { Box, Container } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Header from "~/components/header";
import ThemeToggle from "~/components/theme-toggle";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Container maxW="6xl">
          <Box mt="10">{children}</Box>
        </Container>
      </Box>

      <ThemeToggle />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
