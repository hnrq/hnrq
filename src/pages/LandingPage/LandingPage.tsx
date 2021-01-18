import { Section } from 'components/Section';
import { HomeContainer } from 'containers/HomeContainer';
import { AboutContainer } from 'containers/AboutContainer';
import useAnalyticsPage from 'hooks/useAnalyticsPage';
import { PostsContainer } from 'containers/PostsContainer';
import './LandingPage.scss';

const LandingPage = () => {
  useAnalyticsPage('landing');
  
  return (
    <div className="main-page">
      <Section name="home" containerId="home" revealOnScroll={false} classList="home">
        <HomeContainer />
      </Section>
      <div className="section-spacing" />
      <Section name="about" containerId="about">
        <AboutContainer />
      </Section>
      <div className="section-spacing" />
      <Section classList="posts" name="posts" containerId="posts">
        <PostsContainer />
      </Section>
    </div>
  );
};

export default LandingPage;