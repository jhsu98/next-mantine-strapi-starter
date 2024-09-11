"use client";
import { colorsTuple, createTheme, MantineThemeOverride } from "@mantine/core";
import {
  ACCENT_COLOR,
  FAILURE_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
} from "@/constants/config";

const theme: MantineThemeOverride = createTheme({
  primaryColor: "primary",
  colors: {
    primary: colorsTuple(PRIMARY_COLOR),
    secondary: colorsTuple(SECONDARY_COLOR),
    accent: colorsTuple(ACCENT_COLOR),
    success: colorsTuple(SUCCESS_COLOR),
    failure: colorsTuple(FAILURE_COLOR),
  },
});

export default theme;
