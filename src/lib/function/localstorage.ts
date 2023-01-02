export const setLocalstorage = (item: string) => {
  try {
    localStorage.setItem("token", item);
  } catch (err) {
    console.error(err);
  }
};

export const getLocalStorage = (value: string) => {
  try {
    const item = localStorage.getItem(value);
    if (item !== null) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.error(err);
  }
};
