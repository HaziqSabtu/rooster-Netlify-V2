import React from "react";
import ReactDOM from "react-dom/client";

// https://v5.reactrouter.com/web/guides/philosophy
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>
);
