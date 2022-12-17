import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Authentication from "./pages/Authentification";
import Home from "./pages/Home";
import InterventionCard from "./components/InterventionCards";
import InternventionsForm from "./pages/InterventionsForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Authentication" element={<Layout />}>
          <Route index element={<Authentication />} />
        </Route>
        <Route path="/Home" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/InternventionsForm" element={<Layout />}>
          <Route index element={<InternventionsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
