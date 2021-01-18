import { useEffect } from 'react';
import './App.scss';
import { LandingPage } from 'pages/LandingPage';
import { Header } from 'containers/Header';
import ReactGA from 'react-ga';

const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-178053844-1');
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
