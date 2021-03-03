import React from 'react';
import Paper from '@material-ui/core/Paper';

import { makeStyles, Typography } from '@material-ui/core';

const makeStyleFunc = makeStyles({
  root: {
    padding: '4px',
  },
});

export default function GameInfo(props) {
  const { gameStats } = props;
  const { level, lives, score } = gameStats;

  const style = makeStyleFunc();

  return (
    <div>
      <Paper elevation={3} className={style.root}>
        <Typography>
          Score:
          &nbsp;
          {score}
        </Typography>
        <Typography>
          Level:
          &nbsp;
          {level}
        </Typography>
        <Typography>
          Lives:
          &nbsp;
          {lives}
        </Typography>
      </Paper>
    </div>
  );
}
