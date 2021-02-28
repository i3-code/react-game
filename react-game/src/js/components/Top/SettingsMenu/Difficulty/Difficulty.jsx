import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Difficulty(props) {
  const { value, callBack } = props;

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        Difficulty
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label="game difficulty"
        >
          <ToggleButton value={0} aria-label="easy">easy</ToggleButton>
          <ToggleButton value={1} aria-label="normal">normal</ToggleButton>
          <ToggleButton value={2} aria-label="hard">hard</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
