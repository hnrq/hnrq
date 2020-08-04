// @flow
import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import './Skillbar.scss';

type Props = {
  /** Label to be rendered over the Skillbar */
  label: String,
  /** String or array of strings of classnames */
  classList: Array<string> | string,
  /** Skill value */
  value: double
}

const Skillbar = ({
  label,
  classList,
  value
}: Props) => (
  <motion.div 
    data-testid="skillbar" 
    animate={{ y: 0, opacity: 1 }}
    initial={{ y: 100, opacity: 0 }}
    className={classNames('skillbar', classList)}
    transition={{
      y: { stiffness: 1000, velocity: -100 },
      duration: 2,
      ease: 'easeOut',
      type: 'spring'
    }}
  >
    <div className="skillbar-info">
      <span className="skillbar-label">{label}</span>
      <span className="skillbar-value">{value}/10</span>
    </div>
    <div className="bar">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ 
          duration: 2,
          delay: 0.25,
          ease: 'easeOut'
        }}
        className="skillbar-bar" 
        data-testid="skillbar-bar" 
      />
    </div>
  </motion.div>
);

export default Skillbar;