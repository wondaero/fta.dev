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



  return (
    <>
      <div className="wrapper">
        <header>
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
