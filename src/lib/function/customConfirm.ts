export const customConfirm = (massage: string, callback: () => void): void => {
  if (window.confirm(massage)) {
    callback();
  }
};
