import React from "react";
import PropTypes from "prop-types";

import styles from "./loader.module.scss";

export default function Loader({ variant, className }) {
  return (
    <div
      className={`${styles["three-dots-loader"]} ${className} ${
        variant === "dark" ? styles["dark-loader"] : ""
      }`}
      data-testid="loader"
    />
  );
}

Loader.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  variant: "",
  className: "",
};
