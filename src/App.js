import React from "react";

import "./App.css";
import AppRoutes from './AppRoute'
import Navbar from "./Components/Navbar/navbar";

import "primereact/resources/themes/lara-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons



export default function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}
