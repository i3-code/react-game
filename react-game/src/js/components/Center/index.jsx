import React from 'react';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Button, Container, Typography } from '@material-ui/core';

import GameStepper from './GameStepper';
import Board from './Board';
import GameInfo from './GameInfo';

import { loadSettings, saveSettings, saveScore } from '../../utils/storage';

import { LOCALE } from '../../constants/locale';

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

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function Center(props) {
  const { appSettings } = props;
  const locale = LOCALE[appSettings.locale];

  const settings = loadSettings();
  const {
    level,
    lives,
    score,
  } = settings;
  const [gameLevel, setGameLevel] = React.useState(level);
  const [gameLives, setGameLives] = React.useState(lives);
  const [gameScore, setGameScore] = React.useState(score);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const saveGameSettings = (newLives = 3, newLevel = 1, newScore = 0) => {
    setGameLevel(newLevel);
    setGameLives(newLives);
    setGameScore(newScore);
    saveSettings({
      lives: newLives,
      level: newLevel,
      score: newScore,
    });
  };
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
        playSound(failureSound);
        handleOpen();
        return;
      }
      playSound(wrongSound);
    }

    saveGameSettings(newLives, newLevel, newScore);
  };

  if (!window.resetLevel) window.resetLevel = saveGameSettings;

  const diffSettings = loadSettings();
  const { difficulty } = diffSettings;

  const handleClose = () => {
    saveScore({ score: gameScore, level: gameLevel, difficulty });
    saveGameSettings();
    setOpen(false);
  };

  const gameStats = {
    level: gameLevel,
    lives: gameLives,
    score: gameScore,
    difficulty,
  };

  return (
    <div className="center">
      <div className="game">
        <Board gameLevel={gameLevel} callBack={handleGameLevelChange} />
        <GameInfo className="game-info" appSettings={appSettings} gameStats={gameStats} />
      </div>
      <Paper className="game-stepper" elevation={3}>
        <GameStepper gameLevel={gameLevel} appSettings={appSettings} />
      </Paper>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{locale.gameOver}</DialogTitle>
        <DialogContent>
          <Container>
            <Typography>
              {locale.score}
              :
              &nbsp;
              {gameScore}
            </Typography>
            <Typography>
              {locale.level}
              :
              &nbsp;
              {gameLevel}
            </Typography>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {locale.close}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
