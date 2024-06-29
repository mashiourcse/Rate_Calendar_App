import { createBrowserRouter } from "react-router-dom";

import Layouts from "../src/components/layouts/Layouts";

import { RateCalendar } from "../src/pages/RateCalendar/RateCalendar";
import { ParentComponent } from "../src/pages/RateCalendar/ParentComponent";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <ParentComponent/>,
      },
      
      {
        path: "/rate-calendar",
        element: <RateCalendar/>
      },
      {
        path: "/rate-calendar-main",
        element: <ParentComponent/>
      }
    ],
  },
 
]);
