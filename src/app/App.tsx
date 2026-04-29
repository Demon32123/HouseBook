import { createContext, RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./components/AuthContext";
import { CommLibContextProvider } from "./contexts/CommLibContext";

export default function App() {
  return (
    <CommLibContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CommLibContextProvider>
  );
}
