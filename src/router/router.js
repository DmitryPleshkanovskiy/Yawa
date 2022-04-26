/* eslint-disable react/no-array-index-key */
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
import { Loader } from "components/simple";

// Styles
import styles from "./router.module.scss";

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
          key={`route-${i}`}
          path={route.path}
          element={withSuspense(
            route.element,
            <div className={styles.suspenseLoader} style={{}}>
              <Loader variant="dark" />
            </div>
          )}
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
