import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl ="https://raw.githubusercontent.com/ovpn-dev/micro-gpt/main/public/manifest.json";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ChakraProvider>
        {" "}
        <App />
      </ChakraProvider>
    </TonConnectUIProvider>
  </StrictMode>
);
