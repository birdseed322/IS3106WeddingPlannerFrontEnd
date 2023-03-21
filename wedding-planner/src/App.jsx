import React from "react";
import "bootstrap/dist/css/bootstrap.css"; // loads the default bootstrap CSS
import EndPoints from "./routes/EndPoints.jsx";

import "./App.css"
//Main App component

function App() {
    // gotta set & declare heights here, so that the main body Container can adjust min-height
    // i think the rest we can do in CSS

    return (
        <EndPoints />
    );
}

export default App;
