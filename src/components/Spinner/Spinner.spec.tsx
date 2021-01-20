import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner test section', () => {
  it('should render a div.', () => {
    // prepare
    const { getByTestId } = render(<Spinner />);
    // execute
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should receive CSS classes through the classList prop.', () => {
    // prepare
    const { getByTestId } = render(<Spinner classList="test" />);
    // execute
    expect(getByTestId('spinner')).toHaveClass('test');
  });
});
