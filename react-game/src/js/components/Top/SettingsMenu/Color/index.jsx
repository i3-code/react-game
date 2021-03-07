import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { LOCALE } from '../../../../constants/locale';

export default function Color(props) {
  const { value, callBack, localeValue } = props;
  const locale = LOCALE[localeValue];

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        {locale.colorStyle}
      </Typography>
      <Container>
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={callBack}
          aria-label={locale.colorStyle}
        >
          <ToggleButton value="primary" aria-label={locale.primary}>{locale.primary}</ToggleButton>
          <ToggleButton value="secondary" aria-label={locale.secondary}>{locale.secondary}</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
