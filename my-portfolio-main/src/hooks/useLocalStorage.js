import {useState} from "react";

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Only use the stored value if the user explicitly set it before.
      // This prevents stale dark/light state persisting in WebViews
      // (e.g. Facebook in-app browser) where the user never chose a theme.
      const userHasSetTheme = window.localStorage.getItem(key + "_userSet");
      if (userHasSetTheme === "true") {
        const item = window.localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : initialValue;
      }
      // No explicit preference saved — return safe default (light mode)
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage AND marks it as user-set.
  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save the theme value
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Mark that the user has explicitly set their preference
      window.localStorage.setItem(key + "_userSet", "true");
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
