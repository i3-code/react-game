import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { Icon, Paper } from '@material-ui/core';

import BatIcon from '../../../../assets/images/ac_1.svg';
import MoleIcon from '../../../../assets/images/ac_2.svg';
import DogIcon from '../../../../assets/images/ac_3.svg';
import CatIcon from '../../../../assets/images/ac_4.svg';
import TigerIcon from '../../../../assets/images/ac_5.svg';
import HawkIcon from '../../../../assets/images/ac_6.svg';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons = {
    1: <Icon><img src={BatIcon} height={25} width={25} alt="bat" /></Icon>,
    2: <Icon><img src={MoleIcon} height={25} width={25} alt="mole" /></Icon>,
    3: <Icon><img src={DogIcon} height={25} width={25} alt="dog" /></Icon>,
    4: <Icon><img src={CatIcon} height={25} width={25} alt="cat" /></Icon>,
    5: <Icon><img src={TigerIcon} height={25} width={25} alt="tiger" /></Icon>,
    6: <Icon><img src={HawkIcon} height={25} width={25} alt="hawk" /></Icon>,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  stepper: {
    padding: '4px',
  },
  label: {
    color: 'blue',
    margin: 0,
  },
});

function getSteps() {
  return ['bat', 'mole', 'dog', 'cat', 'tiger', 'hawk'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return '0-4';
    case 1:
      return '5-9';
    case 2:
      return '10-14';
    case 3:
      return '15-19';
    case 4:
      return '20-24';
    case 5:
      return '25-29';
    default:
      return '29+';
  }
}

export default function GameStepper() {
  const classes = useStyles();
  const activeStep = 0;
  const steps = getSteps();

  return (
    <Paper className={classes.root} elevation={3}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {label}
              <br />
              {getStepContent(index)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
