import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Color(props) {
  const { value, callBack } = props;

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        Color style
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label="color style"
        >
          <ToggleButton value="primary" aria-label="primary">primary</ToggleButton>
          <ToggleButton value="secondary" aria-label="secondary">secondary</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
