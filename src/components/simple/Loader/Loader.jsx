import React from "react";
import styles from "./loader.module.scss";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export default function Loader({ variant, className }) {
  return (
    <div
      className={`${styles["three-dots-loader"]} ${className} ${
        variant === "dark" ? styles["dark-loader"] : ""
      }`}
    />
  );
}

Loader.propTypes = {
  variant: PropTypes.string,
};

Loader.defaultProps = {
  variant: "",
};
