import React from "react";
import PropTypes from "prop-types";

import { Button as BootstrapButton } from "react-bootstrap";
import Loader from "../Loader/Loader";

export default function Button(props) {
  const { variant, loaderVariant, children, isLoading, ...buttonProps } = props;
  return (
    <BootstrapButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
      variant={variant}
      disabled={isLoading}
    >
      {!isLoading ? children : <Loader variant={loaderVariant} />}
    </BootstrapButton>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  loaderVariant: PropTypes.string,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  className: "",
  variant: "",
  loaderVariant: "",
  isLoading: false,
};
