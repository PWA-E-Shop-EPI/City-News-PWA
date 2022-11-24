import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    default: "#ffffff",
    success: "#32936F",
  },
};

interface ThemeProps {
  children?: React.ReactNode;
}

const Theme = (props: ThemeProps) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export default Theme;