export const throwErrors = (...errors: (Error | null)[]) => {
  const error = errors.filter((error) => error !== null);
  if (error.length > 0) {
    throw error.at(0);
  }
};
