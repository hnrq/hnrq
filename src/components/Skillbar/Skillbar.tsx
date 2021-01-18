import { motion } from 'framer-motion';
import classNames from 'classnames';
import './Skillbar.scss';

type SkillbarProps = {
  /** Label to be rendered over the Skillbar */
  label: String,
  /** String or array of strings of classnames */
  classList?: Array<string> | string,
  /** Skill value */
  value: number,
};

const Skillbar = ({ label, classList, value }: SkillbarProps) => (
  <motion.div
    data-testid="skillbar"
    variants={{
      hidden: { y: 50, opacity: 0 },
      show: { y: 0, opacity: 1 },
    }}
    initial="hidden"
    animate="show"
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
        variants={{
          hidden: { width: 0 },
          show: { width: `${value * 10}%` },
        }}
        initial="hidden"
        animate="show"
        transition={{
          duration: 2,
          delay: 0.25,
          ease: 'easeOut',
        }}
        className="skillbar-bar"
        data-testid="skillbar-bar"
      />
    </div>
  </motion.div>
);

export default Skillbar;
