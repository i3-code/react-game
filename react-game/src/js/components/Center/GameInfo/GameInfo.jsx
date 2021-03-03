import React from 'react';
import Paper from '@material-ui/core/Paper';

import { makeStyles, Typography } from '@material-ui/core';

import { LOCALE } from '../../../constants/locale';

const makeStyleFunc = makeStyles({
  root: {
    padding: '4px',
  },
});

export default function GameInfo(props) {
  const { appSettings, gameStats } = props;
  const { level, lives, score } = gameStats;

  const locale = LOCALE[appSettings.locale];

  const style = makeStyleFunc();

  return (
    <div>
      <Paper elevation={3} className={style.root}>
        <Typography>
          {locale.score}
          :
          &nbsp;
          {score}
        </Typography>
        <Typography>
          {locale.level}
          :
          &nbsp;
          {level}
        </Typography>
        <Typography>
          {locale.lives}
          :
          &nbsp;
          {lives}
        </Typography>
      </Paper>
    </div>
  );
}
