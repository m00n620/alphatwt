import { useState, useEffect } from "react";

/**
 * Hook to store in local storage
 * @param key
 * @returns
 */
export const useLocalStorageAuth = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      // We can't read?
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      if (typeof window !== "undefined") {
        if (value) {
          window.localStorage.setItem(key, value);
        } else {
          window.localStorage.removeItem(key);
        }
      }
      setStoredValue(value);
    } catch (error) {
      console.error(error);
      // Silently fail as we can't save
    }
  };

  return [storedValue, setValue];
};
