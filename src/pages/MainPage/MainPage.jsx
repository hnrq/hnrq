// @flow
import React from 'react';
import { Section } from 'components/Section';
import { HomeContainer } from 'containers/HomeContainer';
import { AboutContainer } from 'containers/AboutContainer';
import './MainPage.scss';

const MainPage = () => (
  <div className="main-page">
    <Section name="home" classList="home">
      <HomeContainer />
    </Section>
    <Section name="about">
      <AboutContainer />
    </Section>
    <Section name="posts">
      <h1>hello There</h1>
    </Section>
    <Section name="contact">
      <h1>hello There</h1>
    </Section>
  </div>
);

export default MainPage;