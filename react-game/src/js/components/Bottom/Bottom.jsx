import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GitHubIcon from '@material-ui/icons/GitHub';

const makeStyleFunc = makeStyles({
  root: { flexGrow: 1 },
  github: { flexGrow: 1 },
  logo: {
    display: 'flex',
    'align-items': 'flex-end',
  },
  logoImage: { height: '24px', width: 'auto' },
});

export default function Bottom(props) {
  const style = makeStyleFunc();
  const { data } = props;
  const { settings } = data;
  const { color } = settings;
  return (
    <div className={style.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Link
            href="https://github.com/i3-code/"
            target="blank"
            rel="noopener noreferrer"
            underline="none"
            className={style.github}
          >
            <Button color={color} startIcon={<GitHubIcon />}>i3-code</Button>
          </Link>
          <Link
            href="https://rs.school/react/"
            target="blank"
            rel="noopener noreferrer"
            underline="none"
            className={style.logo}
            color={color}
          >
            <span><img src="https://rs.school/images/rs_school_js.svg" alt="RS School" className={style.logoImage} /></span>
            <span>, 2021</span>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
