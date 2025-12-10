import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import spacing from "./spacing";
import { borderRadius } from "./border";
import { shadows } from "./shadows";
import { backdropBlur } from "./effects";
import { opacity } from "./opacity";

export const theme = createTheme({
  palette,
  typography,
  spacing: (factor: number) => spacing[factor] || spacing[0],
  shape: {
    borderRadius: borderRadius.default,
  },
  custom: {
    backdropBlur,
    opacity,
  },
  shadows,
  components: {
  }
});
