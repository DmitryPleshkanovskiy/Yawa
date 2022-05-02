import React from "react";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";

import styles from "./input.module.scss";

const Input = ({
  label,
  containerClass,
  error,
  onChange,
  onClick,
  labelClass,
  placeholder,
  ...inputProps
}) => {
  const handleChange = ({ target: { name, value, files } }) => {
    onChange(name, value, files);
  };

  return (
    <div className={`${styles.inputContainer} ${containerClass}`}>
      {label && (
        <Form.Label className={`${styles.inputLabel} ${labelClass}`}>
          {label}
        </Form.Label>
      )}

      <div>
        <Form.Control
          type="text"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          onFocus={(e) => e.preventDefault()}
          onChange={handleChange}
          onClick={onClick}
          placeholder={placeholder}
          data-testid="input"
        />
        <Form.Text className={styles.error}>{error}</Form.Text>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  label: "",
  value: "",
  error: "",
  containerClass: "",
  labelClass: "",
  onClick: () => {},
  onChange: () => {},
  placeholder: "",
};

export default Input;
