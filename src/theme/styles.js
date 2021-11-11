import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props) => ({
    body: {
      minH: "100%",
      bg: mode("white", "bg.900")(props),
    },

    html: {
      minH: "100%",
    },
  }),
};
