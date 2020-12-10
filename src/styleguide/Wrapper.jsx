
type WrapperProps = {
  /** Child component */
  children: Array<React.Element<any>>,
};

const Wrapper = ({ children }: WrapperProps) => (
  <div style={{ background: 'black', color: 'white' }}>{children}</div>
);

export default Wrapper;
