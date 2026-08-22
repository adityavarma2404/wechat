import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7A6F9B", light: "#A79FBC", dark: "#5D5479", contrastText: "#F1EDE5" },
    secondary: { main: "#A06F55", light: "#BE927A", dark: "#7B513D" },
    success: { main: "#79A18B" },
    error: { main: "#B96870" },
    background: { default: "#C9C6C2", paper: "#DDD8D1" },
    text: { primary: "#292D33", secondary: "#686A70" },
    divider: "#BDB8B1",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Aptos, "Segoe UI Variable", "Segoe UI", sans-serif',
    h4: { fontFamily: '"Trebuchet MS", Aptos, sans-serif', fontWeight: 700, letterSpacing: "-0.025em" },
    h5: { fontFamily: '"Trebuchet MS", Aptos, sans-serif', fontWeight: 700, letterSpacing: "-0.018em" },
    h6: { fontFamily: '"Trebuchet MS", Aptos, sans-serif', fontWeight: 700, letterSpacing: "-0.01em" },
    button: { fontWeight: 700, textTransform: "none" },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.5 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingInline: 18 } },
    },
    MuiIconButton: {
      styleOverrides: { root: { transition: "background-color 160ms ease, transform 160ms ease", "&:active": { transform: "scale(.94)" } } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: "#D5D0C9", "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#A79FBC" } } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
