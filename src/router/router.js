import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Routes paths
import * as routes from "./routes";
import routesConfig from "./routes/routesConfig";

// Components
import { Navbar } from "components/complex";

const withSuspense = (WrappedComponent, fallback) => (
  <Suspense fallback={fallback}>
    <WrappedComponent />
  </Suspense>
);

const MainRouter = () => (
  <Router>
    <Navbar />
    <Routes>
      {routesConfig.map((route, i) => (
        <Route
          // eslint-disable-next-line react/no-array-index-key
          key={`route-${i}`}
          path={route.path}
          element={withSuspense(route.element, <div>Loading...</div>)}
        />
      ))}
      <Route
        path="*"
        element={<Navigate replace to={routes.forecastScreen} />}
      />
    </Routes>
  </Router>
);

export default MainRouter;
