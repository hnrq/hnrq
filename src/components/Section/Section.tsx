import { useRef, FC, useEffect } from 'react';
import { Element } from 'react-scroll';
import classNames from 'classnames';
import scrollReveal from 'scrollreveal';
import './Section.scss';

type SectionProps = {
  name: string,
  classList?: Array<string> | string,
  revealOnScroll?: boolean
};

const Section: FC<SectionProps> = ({ 
  name,
  classList, 
  children,
  revealOnScroll = true
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current && revealOnScroll) {
      scrollReveal().reveal(sectionRef.current, { delay: 500 });
    }
  }, [revealOnScroll]);
  
  return (
    <Element name={name} data-testid="scrollElement">
      <section
        ref={sectionRef}
        className={classNames('container scroll-section', classList)}
        data-testid="section"
      >
        {children}
      </section>
    </Element>
  );
};

export default Section;
