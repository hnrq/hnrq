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

const AboutContainer = () => {
  return (
    <motion.div
      variants={{ 
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.7,
            delayChildren: 0.5
          }
        },
        hidden: {
          opacity: 0
        }
      }}
      initial="hidden"
      animate="show"
      className="about-container">
      <div className="row ml-4 mt-6">
        <div className="col-6 title">
          <h1 className="mt-0 mb-2">ABOUT</h1>
          <h1 className="mt-0 mb-2">ME</h1>
          <hr />
        </div>
        <div className="col-6 info pl-5 mt-4 justify-content-center">
          <span className="mb-2"><b>Name:</b> Henrique Alberone Ramos</span>
          <span className="mb-2"><b>Birthdate:</b> August, 21, 1999</span>
          <span className="mb-2"><b>Works as:</b> Front-end Developer</span>
          <span className="mb-2"><b>Lives in:</b> Belo Horizonte, Brazil</span>
        </div>
        <motion.div className="col-6 skills">
            {skills.map(({ label, value }) => (
              <Skillbar 
                label={label}
                key={label}
                classList="mb-3" 
                value={value} 
              />
            ))}
          </motion.div>
        
          <div className="pl-5 col-6 text">
          <p>
            <h4 className="mt-3">Bio:</h4>
            Undergraduate Software Engineering student who spends his spare time losing his sanity in Dota 2,
            talking s*** on <a href="http://twitter.com/alberoneramos">Twitter</a> and, sometimes, tries to be 
            productive and learn something new about UI/UX design, Web and Mobile Development. 
             Also writes to <a href="http://dev.to/hnrq">Dev.to</a> 
          </p>
        </div>
      </div>
      <div className="row">

      <div className="col-6 justify-content-center">
          
        </div>
      </div>
    </motion.div>
  );
}

export default AboutContainer