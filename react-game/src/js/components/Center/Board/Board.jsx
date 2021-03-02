import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const size = 3;

const makeStyleFunc = makeStyles({
  grid: {
    width: '60vh',
    minWidth: '300px',
    height: '60vh',
    minHeight: '300px',
    padding: '4px',
    display: 'grid',
    gridGap: `${4 / size}%`,
    gridTemplateColumns: `repeat(${size}, 1fr)`,
  },
});

export default function Board() {
  const style = makeStyleFunc();
  const grid = new Array(size * size).fill(0);
  return (
    <Paper className={style.grid} elevation={3}>
      {grid.map((_, index) => <div key={`cube-${index + 1}`} className="game-cube" />)}
    </Paper>
  );
}
