import { render } from '@testing-library/react';
import Section from './Section';

describe('Section test section', () => {
  it('should be rendered', () => {
    // prepare
    const { getByTestId } = render(<Section name="test" />);
    // execute
    expect(getByTestId('section')).toBeInTheDocument();
  });

  it('should receive name as props', () => {
    // prepare
    const { getByTestId } = render(<Section name="test" />);
    // execute
    expect(getByTestId('section').getAttribute('name')).toBe('test');
  });

  it('should receive classList as props', () => {
    // prepare
    const { getByTestId } = render(<Section classList="test" />);
    // execute
    expect(getByTestId('section')).toHaveClass('test');
  });

  it('should receive children as props', () => {
    // prepare
    const { getByTestId } = render(
      <Section classList="test">
        <h1 data-testid="children">Test</h1>
      </Section>
    );
    // execute
    expect(getByTestId('children')).toBeInTheDocument();
  });
});
