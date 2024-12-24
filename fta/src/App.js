import React, { useState } from 'react';

import './App.css';
import './assets/style.scss';

import GameView from './components/GameView';
import InitView from './components/InitView';

function App() {

  const [viewType, _setViewType] = useState('initView');

  const startGame = () => {
    _setViewType('gameView');
  }

  const isChristMasEdition = () => {
    const now = new Date();
    return (now.getMonth() + 1) === 12 && (now.getDate() === 24 || now.getDate() === 25);
  }

  return (
    <>
      <div className="wrapper">
        <header className={isChristMasEdition() ? 'christmas' : ''}>
          <h1>Find Them All</h1>
          <strong>with React</strong>
        </header>
        <div className="main">
          {viewType === 'initView' ? <InitView onClickHandler={ startGame } /> : <GameView onClickHandler={ startGame } />}
        </div>
      </div>
    </>
  );
}

export default App;
