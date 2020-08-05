// @flow
import React from 'react';
import { Section } from 'components/Section';
import { HomeContainer } from 'containers/HomeContainer';
import { AboutContainer } from 'containers/AboutContainer';
import { PostsContainer } from 'containers/PostsContainer';
import './MainPage.scss';

const MainPage = () => (
  <div className="main-page">
    
    <Section name="home" containerId="home" classList="home">
      <HomeContainer />
    </Section>
    <Section name="about" containerId="about">
      <AboutContainer />
    </Section>
    <Section classList="posts" name="posts" containerId="posts">
      <PostsContainer />
    </Section>
  </div>
);

export default MainPage;