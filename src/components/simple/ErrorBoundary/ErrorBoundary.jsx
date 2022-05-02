import React from "react";
import PropTypes from "prop-types";

import styles from "./error-boundary.module.scss";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className={styles.error} data-testid="error-message">
          Something went wrong. Try to reload the page or contact our support.{" "}
          <div style={{ maxHeight: 100, overflowY: "auto" }}>
            <code>{JSON.stringify(errorInfo)}</code>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.number]),
};

ErrorBoundary.defaultProps = {
  children: null,
};
