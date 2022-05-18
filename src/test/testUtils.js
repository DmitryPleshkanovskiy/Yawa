export const findByTestAttribute = (wrapper, attributeName) =>
  wrapper.find(`[data-testid='${attributeName}']`);
