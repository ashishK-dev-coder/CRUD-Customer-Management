import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowComponent from "./components/ShowComponent/ShowComponent.jsx";

export default function Index() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          {" "}
        </Route>
        <Route path="/show" element={<ShowComponent />}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
