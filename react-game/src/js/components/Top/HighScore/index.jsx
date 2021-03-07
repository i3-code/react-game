import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { loadScore } from '../../../utils/storage';

import { LOCALE } from '../../../constants/locale';
import { DIFFICULTY } from '../../../constants';

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
  const score = loadScore();
  const { appSettings } = props;
  const { color, locale } = appSettings;

  const [open, setOpen] = React.useState(false);

  const language = LOCALE[locale];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useHotkeys('shift+h', () => handleClickOpen());

  return (
    <div>
      <Tooltip title={language.highScore}>
        <div>
          <IconButton edge="start" color={color} aria-label="Settings" onClick={handleClickOpen}>
            <AssignmentIcon />
          </IconButton>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="xs">
            <DialogTitle id="customized-dialog-title" onClose={handleClose} color={color}>
              {language.highScore}
            </DialogTitle>
            <DialogContent dividers>
              <Container>
                <TableContainer component={Paper}>
                  <Table className="game-table" size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">{language.score}</TableCell>
                        <TableCell align="right">{language.level}</TableCell>
                        <TableCell align="right">{language.difficultyShort}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {score.map((row, index) => (
                        <TableRow key={`line${index + 1}`}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="right">{row.score}</TableCell>
                          <TableCell align="right">{row.level}</TableCell>
                          <TableCell align="right">{language[DIFFICULTY[row.difficulty]]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color={color}>
                {language.close}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Tooltip>
    </div>

  );
}
