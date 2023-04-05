import React from "react";
// import "bootstrap/dist/css/bootstrap.css"; // loads the default bootstrap CSS
import EndPoints from "./routes/EndPoints.jsx";
import "primereact/resources/primereact.css";
//import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "./App.css";
import "primeflex/primeflex.css";
//Main App component
import TempEndpoints from "./routes/TempEndpoints.jsx";

function App() {

    return (<EndPoints></EndPoints>);
}

export default App;
