import { useState, useEffect } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // State to track whether the component has mounted on the client
  const [hasMounted, setHasMounted] = useState(false);

  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue; // During SSR, return initial value
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error retrieving localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [state, setState] = useState<T>(getStoredValue);

  // Only update the state with localStorage value after component has mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, state, hasMounted]);

  // Ensure SSR consistency by returning initial value on server-side render
  return [hasMounted ? state : initialValue, setState];
}
