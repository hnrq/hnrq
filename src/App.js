import React from 'react';
import './App.scss';
import { MainPage } from 'pages/MainPage';
import { Header } from 'containers/Header';

const App = () => (
  <div className="app">
    <Header />
    <MainPage />
    <footer></footer>
  </div>
);

export default App;
