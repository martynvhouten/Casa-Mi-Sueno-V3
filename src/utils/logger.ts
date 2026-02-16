/* eslint-disable no-console */
const isDevelopment = import.meta.env.DEV;

const noop = (): void => {
  // Intentionally empty for non-development builds.
};

export const logger = {
  log: isDevelopment ? console.log.bind(console) : noop,
  warn: isDevelopment ? console.warn.bind(console) : noop,
  error: isDevelopment ? console.error.bind(console) : noop
};

export default logger;
