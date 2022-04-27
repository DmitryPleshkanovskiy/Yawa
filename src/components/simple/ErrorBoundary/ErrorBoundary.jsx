import React from "react";

import styles from "./error-boundary.module.scss";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.error}>
          Something went wrong. Try to reload the page or contact our support.{" "}
          <div style={{ maxHeight: 100, overflowY: "auto" }}>
            <code>{JSON.stringify(errorInfo)}</code>
          </div>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}
