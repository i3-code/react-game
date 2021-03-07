import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import { LOCALE } from '../../../../constants/locale';

const useStyles = makeStyles({
  root: { width: '80%' },
});

function VolumeButton(props) {
  const { value, localeValue, type } = props;
  const locale = LOCALE[localeValue];
  let button = (value) ? <MusicNoteIcon /> : <MusicOffIcon />;
  let tooltip = (value) ? locale.muteMusic : locale.enableMusic;
  if (type === 'sound') {
    button = (value) ? <VolumeDown /> : <VolumeOffIcon />;
    tooltip = (value) ? locale.muteSound : locale.enableSound;
  }

  return (
    <Tooltip title={tooltip}>
      {button}
    </Tooltip>
  );
}

export default function Volume(props) {
  const classes = useStyles();
  const {
    color,
    localeValue,
    value,
    type,
    callBack,
  } = props;
  const locale = LOCALE[localeValue];
  const [volume, setVolume] = React.useState(0);

  const handleVolumeSwitch = (event) => {
    if (volume && !value) {
      setVolume(0);
      callBack(event, volume);
    }
    if (!volume && value) {
      setVolume(value);
      callBack(event, 0);
    }
  };

  const hotKey = (type === 'music') ? 'shift+m' : 'shift+s';
  useHotkeys(hotKey, () => handleVolumeSwitch('event'));

  const label = (type === 'music') ? locale.musicVolume : locale.soundVolume;

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton color={color} aria-label="Volume" onClick={handleVolumeSwitch} size="small">
            <VolumeButton type={type} value={value} localeValue={localeValue} />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={callBack}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            color={color}
          />
        </Grid>
      </Grid>
    </div>
  );
}
