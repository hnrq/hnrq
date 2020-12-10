import { render } from '@testing-library/react';
import NavLink from './NavLink';

describe('NavLink test section', () => {
  it('Should be rendered.', () => {
    // prepare
    const { getByTestId } = render(<NavLink to="test" />);
    // execute
    expect(getByTestId('nav-link')).toBeInTheDocument();
  });

  it('Should receive a children as prop.', () => {
    // prepare
    const { getByText } = render(<NavLink to="test">NavLink Test</NavLink>);
    // execute
    expect(getByText('NavLink Test')).toBeInTheDocument();
  });

  it('Should receive a classList as prop.', () => {
    // prepare
    const { getByTestId } = render(<NavLink to="test" classList="test" />);
    // execute
    expect(getByTestId('nav-link')).toHaveClass('test');
  });

  it('Should receive a to as prop.', () => {
    // prepare
    const { getByTestId } = render(<NavLink to="test" />);
    // execute
    expect(getByTestId('nav-link'));
  });
});
