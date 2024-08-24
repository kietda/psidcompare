// ref: https://stackoverflow.com/questions/40132775/autofocus-textfield-using-react-material-ui
// https://stackoverflow.com/questions/43384039/how-to-get-the-textfield-value-when-enter-key-is-pressed-in-react

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleItem from "./pages/SingleItem";
import Error from "./pages/Error";
// import components
import Navbar from "./components/Navbar";
import ImportItem from "./pages/ImportItem";
import ExportItem from "./pages/ExportItem";
import EditItem from "./pages/EditItem";
import EmailTest from "./pages/EmailTest";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import AddItem from "../components/AddItem";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
