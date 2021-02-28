import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Tooltip } from '@material-ui/core';

import SettingsMenu from './SettingsMenu/SettingsMenu';

const makeStyleFunc = makeStyles({
  title: { flexGrow: 1 },
});

export default function Top(props) {
  const style = makeStyleFunc();
  const { settings } = props;
  const color = settings.color.value;

  return (
    <div className={style.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={style.title} color={color}>
            Eye-Test Game
          </Typography>

          <Tooltip title="Auto Play">
            <IconButton edge="start" color={color} variant="outlined" aria-label="Auto Play">
              <PlayCircleOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="High Score">
            <IconButton edge="start" color={color} aria-label="High Score">
              <AssignmentIcon />
            </IconButton>
          </Tooltip>

          <SettingsMenu settings={settings} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
