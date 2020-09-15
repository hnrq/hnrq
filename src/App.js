import React from 'react';
import './App.scss';
import { LandingPage } from 'pages/LandingPage';
import { Header } from 'containers/Header';
import ReactGA from 'react-ga';

const App = () => {
  React.useEffect(() => {
    ReactGA.initialize('UA-178053844-1');
  }, []);

  return (
    <div className="app">
      <Header />
      <LandingPage />
      <footer></footer>
    </div>
  );
};

export default App;
