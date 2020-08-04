// @flow
import React from 'react';
import './AboutContainer.scss';
import { Skillbar } from 'components/Skillbar';
import { motion } from 'framer-motion';

const skills = [
  {
    label: 'Javascript',
    value: 8.6
  },
  {
    label: 'React.js',
    value: 8.3
  },
  {
    label: 'CSS',
    value: 7.4
  },
  {
    label: 'Flutter',
    value: 5.5
  }
];

const AboutContainer = () => (
  <div className="about-container">
    <div className="row ml-4 mt-6">
      <div className="col-6 justify-content-center title">
        <h1 className="mt-0 mb-3">ABOUT</h1>
        <h1 className="mt-0 mb-3">ME</h1>
        <hr />
      </div>
      <div className="pl-4 col-6 text">
        <p>
          Undergraduate Software Engineering student, who's interested in UI/UX Design
          for mobile platforms and currently works with <b>Front-end development</b>.
          Also writes for <b>Dev.to</b> sometimes.
        </p>
      </div>
      <motion.div
        className="col-6 skills"
          variants={{ 
            open: {
              staggerchildren: 0.07,
              delayChildren: 0.5
            }
          }}
        >
          {skills.map(({ label, value }) => (
            <Skillbar 
              label={label}
              key={label}
              classList="mb-3" 
              value={value} 
            />
          ))}
        </motion.div>
    </div>
    <div className="row">

    <div className="col-6 justify-content-center">
        
      </div>
    </div>
  </div>
);

export default AboutContainer