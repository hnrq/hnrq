// @flow
import React from 'react';
import { ScrollElement } from 'react-scroll';
import classNames from 'classnames';
import './Section.scss';

type Props = {
  name: string,
  classList: Array<string> | string,
  children: React$Element<any>
}

const Section = ({
  name,
  classList,
  children
}: Props) => (
    <section 
      name={name} 
      className={classNames("container", classList)}
      data-testid="section"
    >
      {children}
    </section>
  );

export default ScrollElement(Section);