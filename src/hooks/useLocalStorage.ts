import { useEffect, useState } from "react";

const getStorage = <T>(key: string, defaultValue: T): T => {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getStorage<T>(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
