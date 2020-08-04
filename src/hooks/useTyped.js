import React from 'react';
import Typed from 'typed.js';

const useTyped = (ref, options) => {
  const instance = React.useRef(null);
  React.useEffect(() => {
    if (ref.current === null) return;
    instance.current = new Typed(ref.current, options);
    return () => instance.current.destroy();
  }, [ref, options]);
  return instance.current;
};
export default useTyped;