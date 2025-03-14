import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.50", "gray.900")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
      transition: "background-color 0.2s"
    },
    "#__next": {
      minH: "100vh",
      bg: mode("gray.50", "gray.900")(props)
    }
  }),
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === "dark" ? "blue.500" : "blue.500",
        color: "white",
        _hover: {
          bg: props.colorMode === "dark" ? "blue.600" : "blue.600",
        },
      }),
    },
  },
};

const theme = extendTheme({ config, styles, components });

export default theme;