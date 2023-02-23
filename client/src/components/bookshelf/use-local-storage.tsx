import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T,>({
  defaultValue,
  key,
}: {
  defaultValue: T;
  key: string;
}): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(
    JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
