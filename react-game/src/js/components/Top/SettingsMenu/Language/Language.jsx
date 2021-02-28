import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Language(props) {
  const { value, callBack } = props;

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        Language
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label="english"
        >
          <ToggleButton value="en" aria-label="english">english</ToggleButton>
          <ToggleButton value="ru" aria-label="russian">russian</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
