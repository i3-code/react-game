import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { LOCALE } from '../../../../constants/locale';

export default function Difficulty(props) {
  const { value, callBack, localeValue } = props;
  const locale = LOCALE[localeValue];

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        {locale.difficulty}
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label={locale.difficulty}
        >
          <ToggleButton value={0} aria-label={locale.easy}>{locale.easy}</ToggleButton>
          <ToggleButton value={1} aria-label={locale.normal}>{locale.normal}</ToggleButton>
          <ToggleButton value={2} aria-label={locale.hard}>{locale.hard}</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
