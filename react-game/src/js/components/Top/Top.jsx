import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Tooltip } from '@material-ui/core';

import SettingsMenu from './SettingsMenu/SettingsMenu';
import HighScore from './HighScore/HighScore';

import { LOCALE } from '../../constants/locale';

const makeStyleFunc = makeStyles({
  title: { flexGrow: 1 },
});

export default function Top(props) {
  const style = makeStyleFunc();
  const { appSettings, callBacks } = props;
  const { color } = appSettings;
  const locale = LOCALE[appSettings.locale];

  return (
    <div className={style.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={style.title} color={color}>
            {locale.appName}
          </Typography>

          <Tooltip title={locale.autoPlay}>
            <IconButton edge="start" color={color} variant="outlined" aria-label={locale.autoPlay}>
              <PlayCircleOutlineIcon />
            </IconButton>
          </Tooltip>

          <HighScore appSettings={appSettings} callBacks={callBacks} />
          <SettingsMenu appSettings={appSettings} callBacks={callBacks} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
