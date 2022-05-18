import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

import reducer, { initialState } from "./reducer";
import { useActions } from "./actions";

const Store = createContext();

Store.displayName = "Store";

export const useStore = () => useContext(Store);

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useActions(dispatch);

  const contextValue = { state, dispatch, actions };

  return <Store.Provider value={contextValue}>{props.children}</Store.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.number,
  ]),
};

ContextProvider.defaultProps = {
  children: null,
};
