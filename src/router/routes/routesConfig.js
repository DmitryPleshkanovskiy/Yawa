import { lazy } from "react";
import * as routes from ".";

const routesConfig = [
  {
    path: routes.forecastScreen,
    exact: true,
    element: lazy(() => import("../../screens/Forecast")),
  },
  {
    path: routes.mapScreen,
    exact: true,
    element: lazy(() => import("../../screens/WeatherMap")),
  },
  {
    path: routes.settingsScreen,
    exact: true,
    element: lazy(() => import("../../screens/Settings")),
  },
];

export default routesConfig;
