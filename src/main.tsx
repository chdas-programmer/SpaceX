import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MissionDetails from "./components/MissionDetails.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
      <Routes>

      <Route path="/" element={<App/>} />
      <Route path="/details/:id" element={<MissionDetails/>}/>


      </Routes>
      </BrowserRouter>
      
    </ThemeProvider>
  </StrictMode>
);

