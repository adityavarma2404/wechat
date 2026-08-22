import { RoutingProvider } from "./providers/routing";
import { AuthProvider } from "./context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>
        <RoutingProvider />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
