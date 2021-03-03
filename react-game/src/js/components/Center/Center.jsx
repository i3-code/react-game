import React from 'react';
import Paper from '@material-ui/core/Paper';

import GameStepper from './GameStepper/GameStepper';
import Board from './Board/Board';

import { loadSettings, saveSettings } from '../../utils/storage';

import wrongSound from '../../../assets/sounds/wrong.mp3';
import correctSound from '../../../assets/sounds/correct.mp3';
import failureSound from '../../../assets/sounds/failure.mp3';

function playSound(src) {
  const settings = loadSettings();
  const { sound } = settings;
  let soundItem = new Audio(src);
  soundItem.onloadeddata = () => {
    soundItem.volume = sound / 100;
    soundItem.play();
  };
  soundItem.onended = () => {
    soundItem = undefined;
  };
}

export default function Center(props) {
  const { appSettings } = props;
  const settings = loadSettings();
  const { level, difficulty, lives } = settings;
  const [gameLevel, setGameLevel] = React.useState(level);
  const [gameLives, setGameLives] = React.useState(lives);

  const handleGameLevelChange = (status) => {
    let newLevel = gameLevel;
    let newLives = gameLives;
    if (status === 'right') {
      playSound(correctSound);
      newLevel += 1;
    }
    if (status === 'wrong') {
      newLives -= 1;
      if (newLives - difficulty <= 0) {
        console.log('game over!');
        newLives = 3;
        newLevel = 1;
        playSound(failureSound);
      } else {
        playSound(wrongSound);
      }
    }

    if (newLevel !== gameLevel) {
      setGameLevel(newLevel);
      saveSettings({ level: newLevel });
    }

    if (newLives !== gameLives) {
      setGameLives(newLives);
      saveSettings({ lives: newLives });
    }
  };

  return (
    <div className="center">
      <div className="game">
        <Board gameLevel={gameLevel} callBack={handleGameLevelChange} />
        <div className="game-info">Info</div>
      </div>
      <Paper className="game-stepper" elevation={3}>
        <GameStepper gameLevel={gameLevel} appSettings={appSettings} />
      </Paper>
    </div>
  );
}
