'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setStoredValue = useCallback(
    (newValue: T | ((val: T) => T)) => {
      setValue((currentValue) => {
        const valueToStore = newValue instanceof Function ? newValue(currentValue) : newValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.error(error);
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [value, setStoredValue];
}
