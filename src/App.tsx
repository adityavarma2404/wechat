import { RoutingProvider } from "./providers/routing";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RoutingProvider />
    </AuthProvider>
  );
}

export default App;
