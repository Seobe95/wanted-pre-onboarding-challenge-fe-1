export const setLocalstorage = (item: string) => {
  try {
    localStorage.setItem('token', item);
  } catch (err) {
    console.error(err);
  }
};

export const getLocalStorage = (value: string) => {
  try {
    const item = localStorage.getItem(value);
    if (item !== null) {
      return item;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
