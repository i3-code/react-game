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

import { LOCALE } from '../../../constants/locale';

const gradient = 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: gradient, boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: gradient,
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
    backgroundImage: gradient, boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: gradient,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const iconSize = 25;
  const icons = {
    1: <img src={BatIcon} height={iconSize} width={iconSize} alt="bat" />,
    2: <img src={MoleIcon} height={iconSize} width={iconSize} alt="mole" />,
    3: <img src={DogIcon} height={iconSize} width={iconSize} alt="dog" />,
    4: <img src={CatIcon} height={iconSize} width={iconSize} alt="cat" />,
    5: <img src={TigerIcon} height={iconSize} width={iconSize} alt="tiger" />,
    6: <img src={HawkIcon} height={iconSize} width={iconSize} alt="hawk" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon>
        {icons[icon]}
      </Icon>
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

function getStepContent(step) {
  const stepContent = {
    0: '0-4',
    1: '5-9',
    2: '10-14',
    3: '15-19',
    4: '20-24',
    5: '25-29',
  };
  return stepContent[step] || '29+';
}

export default function GameStepper(props) {
  const classes = useStyles();
  const { gameLevel, appSettings } = props;
  const locale = LOCALE[appSettings.locale];
  const { steps } = locale;
  const activeStep = Math.floor(gameLevel / 5);

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
