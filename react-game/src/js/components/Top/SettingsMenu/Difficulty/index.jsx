import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { LOCALE } from '../../../../constants/locale';
import { DIFFICULTY } from '../../../../constants';

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
          {DIFFICULTY.map((item, index) => (
            <ToggleButton
              key={item}
              value={index}
              aria-label={locale[item]}
            >
              {locale[item]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Container>
    </div>
  );
}
