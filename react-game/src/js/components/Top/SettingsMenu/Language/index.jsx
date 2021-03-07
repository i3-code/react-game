import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { LOCALE } from '../../../../constants/locale';

export default function Language(props) {
  const { value, callBack, localeValue } = props;
  const locale = LOCALE[localeValue];

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        {locale.localization}
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label={locale.localization}
        >
          <ToggleButton value="en" aria-label={locale.english}>{locale.english}</ToggleButton>
          <ToggleButton value="ru" aria-label={locale.russian}>{locale.russian}</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
