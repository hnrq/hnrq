import React from 'react';
import classNames from 'classnames';
import './Spinner.scss';

type Props = {
  // String array or single string of classNames
  classList: Array<string> | string,
}
const Spinner = ({ classList }: Props) => (
  <div className={classNames(classList, "spinner")} data-testid="spinner" />
);


export default Spinner;