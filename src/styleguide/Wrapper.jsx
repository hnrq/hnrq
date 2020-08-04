import React from 'react';

type Props = {
  /** Child component */
  children: Array<React.Element<any>>
};

const Wrapper = ({ children }: Props) => (
  <div style={{background: 'black', color: 'white'}}>{children}</div>
);

export default Wrapper;
