let id = 0;

const defaultOptions = {
  type: "success",
  position: "bottom",
};

export default function createNotification(options) {
  id += 1;

  return {
    ...defaultOptions,
    ...options,
    id,
  };
}
