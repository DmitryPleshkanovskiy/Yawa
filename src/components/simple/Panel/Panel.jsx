import React from "react";
import PropTypes from "prop-types";

import styles from "./panel.module.scss";
import Loader from "../Loader";

export default function Panel({ className, children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`${styles.panel} ${className}`} {...props}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.number,
  ]),
};

Panel.defaultProps = {
  className: "",
  children: null,
};

Panel.Title = ({ className, children }) => (
  <div className={`${styles.title} ${className}`}>{children}</div>
);

Panel.Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.number,
  ]),
};

Panel.Title.defaultProps = {
  className: "",
  children: null,
};

Panel.Body = ({ className, isLoading, children }) => (
  <div className={`${styles.body} ${className}`}>
    {isLoading ? <Loader variant="dark" /> : children}
  </div>
);

Panel.Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.number,
  ]),
  isLoading: PropTypes.bool,
};

Panel.Body.defaultProps = {
  className: "",
  children: null,
  isLoading: false,
};
