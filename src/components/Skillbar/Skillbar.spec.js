import { render } from '@testing-library/react';
import Skillbar from './Skillbar';

describe('Skillbar test section', () => {
  it('should be rendered', () => {
    // prepare
    const { getByTestId } = render(<Skillbar value={8.2} />);
    // execute
    expect(getByTestId('skillbar')).toBeInTheDocument();
  });

  it('should render a label', () => {
    // prepare
    const { getByText } = render(<Skillbar value={8.2} label="Skillbar Label" />);
    // execute
    expect(getByText('Skillbar Label')).toBeInTheDocument();
  });

  it('should receive a value from 0 to 10', () => {
    // prepare
    const { getByText } = render(<Skillbar value={8.2} />);
    // execute
    expect(getByText('8.2/10')).toBeInTheDocument();
  });

  it('should render the skill bar based on the value', () => {
    // prepare
    const { getByTestId, waitFor } = render(<Skillbar value={8.2} />);
    // execute
    expect(getByTestId('skillbar-bar')).toBeInTheDocument();
  });

  it('should receive classNames through the classList prop', () => {
    // prepare
    const { getByTestId } = render(<Skillbar value={8.2} classList="test-class" />);
    // execute
    expect(getByTestId('skillbar')).toHaveClass('test-class');
  });
});
