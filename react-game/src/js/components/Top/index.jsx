import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Tooltip } from '@material-ui/core';

import SettingsMenu from './SettingsMenu';
import HighScore from './HighScore';

import { LOCALE } from '../../constants/locale';

import { loadSettings } from '../../utils/storage';

const makeStyleFunc = makeStyles({
  title: { flexGrow: 1 },
});

function autoPlay() {
  if (window.resetLevel && window.wrongClick) {
    window.resetLevel();
    if (window.autoPlayTimeOut) clearTimeout(window.autoPlayTimeOut);
    if (!window.autoPlayTimeOuts) window.autoPlayTimeOuts = [];
    window.autoPlayTimeOut = setTimeout(() => {
      const diffSettings = loadSettings();
      const {
        lives,
        difficulty,
        score,
        level,
      } = diffSettings;
      const target = lives - difficulty;
      if (score === 0 && level === 1) {
        for (let i = 1; i <= target; i += 1) {
          if (window.autoPlayTimeOuts[i]) clearTimeout(window.autoPlayTimeOuts[i]);
          window.autoPlayTimeOuts.push(setTimeout(window.wrongClick, 1000 * i));
        }
      }
    }, 1000);
  }
}

export default function Top(props) {
  const style = makeStyleFunc();
  const { appSettings, callBacks } = props;
  const { color } = appSettings;
  const locale = LOCALE[appSettings.locale];
  useHotkeys('shift+a', () => autoPlay());

  return (
    <div className={style.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={style.title} color={color}>
            {locale.appName}
          </Typography>

          <Tooltip title={locale.autoPlay}>
            <IconButton
              edge="start"
              color={color}
              variant="outlined"
              aria-label={locale.autoPlay}
              onClick={autoPlay}
            >
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
