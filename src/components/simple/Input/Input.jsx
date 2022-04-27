/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import styles from "./input.module.scss";

const Input = ({
  containerClass,
  inputClass = "",
  error,
  type = "",
  onChange,
  invalid,
  fieldError,
  onClick,
  onBlur,
  setFocus,
  label,
  labelClass,
  placeholder,
  tooltipTitle,
  tooltipDescription,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(!!placeholder);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!placeholder) {
      setIsFocused(false);
    }
  };

  const handleChange = ({ target: { name, value, files } }) => {
    onChange(name, value, files);
  };

  const input = useRef(null);

  useEffect(() => {
    if (setFocus) {
      input.current.focus();
    }
  }, [setFocus]);

  const stop = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles["input-container"]} ${containerClass}`}>
      {label && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={stop}>
          <Form.Label className={`${styles["input-label"]} ${labelClass}`}>
            {label}
          </Form.Label>
        </div>
      )}

      <div>
        <Form.Control
          type="text"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          onChange={handleChange}
          onClick={onClick}
          onBlur={() => {
            handleBlur();
            onBlur();
          }}
          onFocus={handleFocus}
          placeholder={placeholder}
        />
        <Form.Text className={styles.error}>{error}</Form.Text>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  fieldError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({}),
  ]),
  invalid: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  setFocus: PropTypes.bool,
};

Input.defaultProps = {
  value: "",
  label: "",
  error: "",
  containerClass: "",
  type: "text",
  labelClass: "",
  inputClass: "",
  fieldError: "",
  invalid: false,
  onClick: () => {},
  onBlur: () => {},
  onChange: () => {},
  setFocus: false,
};

export default Input;
