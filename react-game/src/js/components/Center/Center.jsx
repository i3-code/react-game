import React from 'react';
import Paper from '@material-ui/core/Paper';

import GameStepper from './GameStepper/GameStepper';
import Board from './Board/Board';
import GameInfo from './GameInfo/GameInfo';

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
  const {
    level,
    lives,
    score,
  } = settings;
  const [gameLevel, setGameLevel] = React.useState(level);
  const [gameLives, setGameLives] = React.useState(lives);
  const [gameScore, setGameScore] = React.useState(score);

  const handleGameLevelChange = (status) => {
    const diffSettings = loadSettings();
    const { difficulty } = diffSettings;
    let newLevel = gameLevel;
    let newLives = gameLives;
    let newScore = gameScore;
    if (status === 'right') {
      playSound(correctSound);
      newLevel += 1;
      newScore += 100 * (1 - Math.abs(((-2 + difficulty) * 0.25)));
    }
    if (status === 'wrong') {
      newLives -= 1;
      if (newLives - difficulty <= 0) {
        newLives = 3;
        newLevel = 1;
        newScore = 0;
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

    if (newScore !== gameScore) {
      setGameScore(newScore);
      saveSettings({ score: newScore });
    }
  };

  const gameStats = {
    level: gameLevel,
    lives: gameLives,
    score: gameScore,
  };

  return (
    <div className="center">
      <div className="game">
        <Board gameLevel={gameLevel} callBack={handleGameLevelChange} />
        <GameInfo className="game-info" gameStats={gameStats} />
      </div>
      <Paper className="game-stepper" elevation={3}>
        <GameStepper gameLevel={gameLevel} appSettings={appSettings} />
      </Paper>
    </div>
  );
}
