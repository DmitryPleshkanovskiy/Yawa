import React from "react";
import PropTypes from "prop-types";

import styles from "./container.module.scss";

export default function Container({ children, className, ...props }) {
  return (
    <div
      className={`${styles.container} ${className}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      data-testid="container"
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.number,
  ]),
};

Container.defaultProps = {
  className: "",
  children: null,
};
