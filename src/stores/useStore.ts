import { useState, useEffect } from 'react';

// type StoreGetter<T, F> = (callback: (state: T) => F) => F;

const useStore = <T, F>(
  // store: StoreGetter<T, F>, // Используем определенный тип
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
