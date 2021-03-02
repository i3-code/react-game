import React from 'react';
import Paper from '@material-ui/core/Paper';

import GameStepper from './GameStepper/GameStepper';
import Board from './Board/Board';

export default function Center() {
  return (
    <div className="center">
      <div className="game">
        <Board />
        <div className="game-info">Info</div>
      </div>
      <Paper className="game-stepper" elevation={3}>
        <GameStepper />
      </Paper>
    </div>
  );
}
