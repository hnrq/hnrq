import { Section } from 'components/Section';
import { HomeContainer } from 'containers/HomeContainer';
import { AboutContainer } from 'containers/AboutContainer';
import { PostsContainer } from 'containers/PostsContainer';
import './LandingPage.scss';

const LandingPage = () => (
  <div className="main-page">
    <Section name="home" revealOnScroll={false} classList="home">
      <HomeContainer />
    </Section>
    <div className="section-spacing" />
    <Section name="about">
      <AboutContainer />
    </Section>
    <div className="section-spacing" />
    <Section classList="posts" name="posts">
      <PostsContainer />
    </Section>
  </div>
);

export default LandingPage;