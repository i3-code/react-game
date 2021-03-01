import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Divider, Tooltip } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Container from '@material-ui/core/Container';

import SoundVolume from './SoundVolume/SoundVolume';
import MusicVolume from './MusicVolume/MusicVolume';
import Difficulty from './Difficulty/Difficulty';
import Color from './Color/Color';
import Language from './Language/Language';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const makeStyleFunc = makeStyles({
  divider: { margin: '10px' },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children,
    classes,
    onClose,
    color,
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} color={color}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SettingsMenu(props) {
  const [open, setOpen] = React.useState(false);
  const { settings } = props;
  const {
    sound,
    music,
    difficulty,
    color,
    locale,
    saveSettingsCallBack,
  } = settings;

  const [soundValue, soundSetValue] = React.useState(sound.volume);
  const [musicValue, musicSetValue] = React.useState(music.volume);
  const [difficultyValue, difficultySetValue] = React.useState(difficulty);
  const [colorValue, colorSetValue] = React.useState(color);
  const [localeValue, localeSetValue] = React.useState(locale);

  const handleSoundChange = (event, newValue) => {
    soundSetValue(newValue);
  };

  const handleMusicChange = (event, newValue) => {
    const { changeCallBack } = music;
    musicSetValue(newValue);
    changeCallBack(newValue);
  };

  const handleDifficultyChange = (event, newValue) => {
    if (newValue !== null) difficultySetValue(newValue);
  };

  const handleColorChange = (event, newValue) => {
    if (newValue !== null) colorSetValue(newValue);
  };

  const handleLocaleChange = (event, newValue) => {
    if (newValue !== null) localeSetValue(newValue);
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    if (difficultyValue !== difficulty) difficultySetValue(difficulty);
    if (colorValue !== color) colorSetValue(color);
    if (localeValue !== color) localeSetValue(locale);
    setOpen(false);
  };

  const handleSave = () => {
    const newSettings = {
      difficulty: difficultyValue,
      color: colorValue,
      locale: localeValue,
    };
    saveSettingsCallBack(newSettings);
    handleClose();
  };

  const style = makeStyleFunc();

  return (
    <Tooltip title="Settings">
      <div>
        <IconButton edge="start" color={color} aria-label="Settings" onClick={handleClickOpen}>
          <SettingsIcon />
        </IconButton>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="xs">
          <DialogTitle id="customized-dialog-title" onClose={handleClose} color={colorValue}>
            Settings
          </DialogTitle>
          <DialogContent dividers>
            <Container>
              <SoundVolume value={soundValue} callBack={handleSoundChange} color={colorValue} />
              <MusicVolume value={musicValue} callBack={handleMusicChange} color={colorValue} />
              <Divider className={style.divider} />
              <Difficulty value={difficultyValue} callBack={handleDifficultyChange} />
              <Divider className={style.divider} />
              <Color value={colorValue} callBack={handleColorChange} />
              <Divider className={style.divider} />
              <Language value={localeValue} callBack={handleLocaleChange} />
            </Container>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleSave} color={colorValue}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Tooltip>
  );
}
