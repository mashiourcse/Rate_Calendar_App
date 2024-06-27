// App.js
import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "../Router/router";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
