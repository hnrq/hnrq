// @flow
import React from 'react';
import { Section } from 'components/Section';
import { HomeContainer } from 'containers/HomeContainer';
import { AboutContainer } from 'containers/AboutContainer';
import './MainPage.scss';

const MainPage = () => (
  <div className="main-page">
    
    <Section name="home" containerId="home" classList="home">
      <HomeContainer />
    </Section>
    <Section name="about" containerId="about">
      <AboutContainer />
    </Section>
    <Section name="posts" containerId="posts">
      <h1>hello There</h1>
    </Section>
    <Section name="contact" containerId="contact">
      <h1>hello There</h1>
    </Section>
  </div>
);

export default MainPage;