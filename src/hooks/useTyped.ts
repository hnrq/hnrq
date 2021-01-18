import { useRef, useEffect } from 'react';
import Typed from 'typed.js';

const useTyped = (ref, options) => {
  const instance = useRef(null);
  useEffect(() => {
    if (ref.current !== null) instance.current = new Typed(ref.current, options);
    return () => instance.current.destroy();
  }, [ref, options]);
  return instance.current;
};
export default useTyped;
