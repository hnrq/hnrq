import classNames from 'classnames';
import './Spinner.scss';

type SpinnerProps = {
  // String array or single string of classNames
  classList?: Array<string> | string,
};
const Spinner = ({ classList }: SpinnerProps) => (
  <div className={classNames(classList, 'spinner')} data-testid="spinner" />
);

export default Spinner;
