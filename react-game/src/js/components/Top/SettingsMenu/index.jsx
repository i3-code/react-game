import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
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

import SoundVolume from './SoundVolume';
import MusicVolume from './MusicVolume';
import Difficulty from './Difficulty';
import Color from './Color';
import Language from './Language';
import Player from './Player';

import { loadSettings, saveSettings } from '../../../utils/storage';

import { LOCALE } from '../../../constants/locale';

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
  const { appSettings, callBacks } = props;
  const { color, locale } = appSettings;
  const settings = loadSettings();
  const { sound, music, difficulty } = settings;

  const [open, setOpen] = React.useState(false);
  const [soundVolume, setSoundVolume] = React.useState(sound);
  const [musicVolume, setMusicVolume] = React.useState(music);
  const [difficultyValue, difficultySetValue] = React.useState(difficulty);
  const [colorValue, colorSetValue] = React.useState(color);
  const [localeValue, localeSetValue] = React.useState(locale);

  const language = LOCALE[localeValue];

  const handleSoundChange = (event, newValue) => {
    if (newValue !== null) {
      setSoundVolume(newValue);
      saveSettings({ sound: newValue });
    }
  };

  const handleMusicChange = (event, newValue) => {
    if (newValue !== null) {
      setMusicVolume(newValue);
      saveSettings({ music: newValue });
    }
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
    if (color !== colorValue) callBacks.color(colorValue);
    if (locale !== localeValue) callBacks.locale(localeValue);
    const newSettings = {
      difficulty: difficultyValue,
      color: colorValue,
      locale: localeValue,
    };
    saveSettings(newSettings);
    setOpen(false);
  };

  const style = makeStyleFunc();

  useHotkeys('shift+t', () => handleClickOpen());

  return (
    <div>
      <Tooltip title={language.settings}>
        <div>
          <IconButton edge="start" color={color} aria-label="Settings" onClick={handleClickOpen}>
            <SettingsIcon />
          </IconButton>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="xs">
            <DialogTitle id="customized-dialog-title" onClose={handleClose} color={colorValue}>
              {language.settings}
            </DialogTitle>
            <DialogContent dividers>
              <Container>
                <SoundVolume
                  value={soundVolume}
                  callBack={handleSoundChange}
                  color={colorValue}
                  localeValue={localeValue}
                />
                <MusicVolume
                  value={musicVolume}
                  callBack={handleMusicChange}
                  color={colorValue}
                  localeValue={localeValue}
                />
                <Divider className={style.divider} />
                <Difficulty
                  value={difficultyValue}
                  callBack={handleDifficultyChange}
                  localeValue={localeValue}
                />
                <Divider className={style.divider} />
                <Color value={colorValue} callBack={handleColorChange} localeValue={localeValue} />
                <Divider className={style.divider} />
                <Language
                  value={localeValue}
                  callBack={handleLocaleChange}
                  localeValue={localeValue}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleSave} color={colorValue}>
                {language.saveChanges}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Tooltip>
      <Player music={musicVolume} />
    </div>

  );
}
