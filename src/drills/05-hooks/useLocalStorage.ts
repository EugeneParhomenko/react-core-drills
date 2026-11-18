import { useState } from 'react';

type CallbackValue<T> = (prev: T) => T;
type SetValueAction<T> = T | CallbackValue<T>;
type SetValue<T> = (valueOrCallback: SetValueAction<T>) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(getFromLocalStorage);

  function setValue(valueOrCallback: SetValueAction<T>): void {
    setStoredValue((prev: T) => {
      const newValue =
        typeof valueOrCallback === 'function'
          ? (valueOrCallback as CallbackValue<T>)(prev)
          : valueOrCallback;
      setToLocalStorage(newValue);
      return newValue;
    });
  }

  function setToLocalStorage(valueToLocalStorage: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(valueToLocalStorage));
    } catch (error) {
      console.error(error);
    }
  }

  function getFromLocalStorage(): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }

  const value = storedValue;
  return [value, setValue];
}
