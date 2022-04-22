import React from "react";
import PropTypes from "prop-types";

import styles from "./panel.module.scss";

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
