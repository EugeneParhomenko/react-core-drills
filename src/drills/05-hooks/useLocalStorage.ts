import { useEffect, useEffectEvent, useState } from 'react';

type CallbackValue<T> = (prev: T) => T;
type SetValueAction<T> = T | CallbackValue<T>;
type SetValue<T> = (valueOrCallback: SetValueAction<T>) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(getFromLocalStorage);

  function setToLocalStorage(keyToStore: string, valueToStore: T): void {
    try {
      localStorage.setItem(keyToStore, JSON.stringify(valueToStore));
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

  const onSetToLocalStorage = useEffectEvent(
    (keyToStore: string, valueToStore: T) => {
      setToLocalStorage(keyToStore, valueToStore);
    },
  );

  useEffect(() => {
    onSetToLocalStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
