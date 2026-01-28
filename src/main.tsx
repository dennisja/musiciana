import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* React flow needs to be inside an element with a known height and width to work */}
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </div>
  </StrictMode>,
);
