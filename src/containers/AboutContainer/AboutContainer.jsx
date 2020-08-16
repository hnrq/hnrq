// @flow
import React from 'react';
import './AboutContainer.scss';
import { Skillbar } from 'components/Skillbar';
import { motion } from 'framer-motion';
import mediaLinks from 'assets/data/mediaLinks';

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
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="about-container">
      <div className="row mt-6">
        <div className="col-6 title">
          <h1 className="mt-0 mb-2">ABOUT</h1>
          <h1 className="mt-0 mb-2">ME</h1>
          <hr />
        </div>
        <div className="col-6 info pl-5 mt-4">
          <span className="mb-2"><b>Name:</b> Henrique Alberone Ramos</span>
          <span className="mb-2"><b>Birthdate:</b> August 21st, 1999</span>
          <span className="mb-2"><b>Works as:</b> Front-end Developer</span>
          <span className="mb-2"><b>Lives in:</b> Belo Horizonte, Brazil</span>
          <div className="row mt-3 mb-4">
            {Object.entries(mediaLinks).map(([key, link], index) => index < 5 && (
              <a 
              key={key}
              href={link} 
              className="icon-link mr-3 link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              {key.substring(0,1).toUpperCase() + key.substring(1)}
            </a>
            ))}
          </div>
        </div>
        <motion.div
          className="col-6 skills"
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
        
          <div className="pl-5 col-6 text">
          <h4 className="mt-0 mb-3">Bio:</h4>
          <p className="mt-0">
            Software Engineer who spends his spare time trying to 
            learn something new about Web and Mobile Development 
            and UI/UX design, editing videos, muddling through 
            Illustrator and losing his sanity while playing Dota 2. 
            Also writes about his programming misadventures on <a
            href={mediaLinks['devto']} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link">
              Dev.to
            </a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutContainer