import React from "react";
import PropTypes from "prop-types";

import { Panel } from "components/simple";

export default function ForecastOneHourStep({ className }) {
  return (
    <Panel className={className}>
      <div>ForecastOneHourStep</div>
    </Panel>
  );
}

ForecastOneHourStep.propTypes = {
  className: PropTypes.string,
};

ForecastOneHourStep.defaultProps = {
  className: "",
};
