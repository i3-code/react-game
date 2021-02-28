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
    language,
  } = settings;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = makeStyleFunc();

  return (
    <Tooltip title="Settings">
      <div>
        <IconButton edge="start" color={color.value} aria-label="Settings" onClick={handleClickOpen}>
          <SettingsIcon />
        </IconButton>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="xs">
          <DialogTitle id="customized-dialog-title" onClose={handleClose} color={color.value}>
            Settings
          </DialogTitle>
          <DialogContent dividers>
            <Container>
              <SoundVolume value={sound.value} callBack={sound.callBack} color={color.value} />
              <MusicVolume value={music.value} callBack={music.callBack} color={color.value} />
              <Divider className={style.divider} />
              <Difficulty value={difficulty.value} callBack={difficulty.callBack} />
              <Divider className={style.divider} />
              <Color value={color.value} callBack={color.callBack} />
              <Divider className={style.divider} />
              <Language value={language.value} callBack={language.callBack} />
            </Container>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color={color.value}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Tooltip>
  );
}
