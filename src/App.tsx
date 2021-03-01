import { useEffect } from 'react';
import { LandingPage } from 'pages/LandingPage';
import { Header } from 'containers/Header';
import ReactGA from 'react-ga';
import './App.scss';

const App = () => {
  useEffect(() => {
    var host = window.location.hostname;
    if (host !== "localhost") {
      ReactGA.initialize('UA-000000-01');
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <LandingPage />
      <footer />
    </div>
  );
};

export default App;
