import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import { LOCALE } from '../../../../constants/locale';

const useStyles = makeStyles({
  root: { width: '80%' },
});

function VolumeButton(props) {
  const { value, localeValue } = props;
  const locale = LOCALE[localeValue];

  const button = (value) ? <VolumeDown /> : <VolumeOffIcon />;
  const tooltip = (value) ? locale.muteSound : locale.enableSound;
  return (
    <Tooltip title={tooltip}>
      {button}
    </Tooltip>
  );
}

export default function SoundVolume(props) {
  const classes = useStyles();

  const {
    value,
    callBack,
    color,
    localeValue,
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

  useHotkeys('shift+s', () => handleVolumeSwitch('event'));

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {locale.soundVolume}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton color={color} aria-label="Volume" onClick={handleVolumeSwitch} size="small">
            <VolumeButton value={value} localeValue={localeValue} />
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
