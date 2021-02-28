import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';

const useStyles = makeStyles({
  root: { width: '80%' },
});

function VolumeButton(props) {
  const { value } = props;
  const button = (value) ? <MusicNoteIcon /> : <MusicOffIcon />;
  const tooltip = (value) ? 'Mute Music' : 'Enable Music';
  return (
    <Tooltip title={tooltip}>
      {button}
    </Tooltip>
  );
}

export default function MusicVolume(props) {
  const classes = useStyles();

  const { value, callBack, color } = props;
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

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Music Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton color={color} aria-label="Volume" onClick={handleVolumeSwitch} size="small">
            <VolumeButton value={value} />
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
