import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { levelGrid, levelRandomColor, getRandomInt } from '../../../utils/engine';

const makeStyleFunc = makeStyles({
  grid: (props) => ({
    width: '60vh',
    minWidth: '300px',
    height: '60vh',
    minHeight: '300px',
    padding: '4px',
    display: 'grid',
    gridGap: `${4 / props.size}%`,
    gridTemplateColumns: `repeat(${props.size}, 1fr)`,
  }),
  cube: (props) => ({
    cursor: 'pointer',
    backgroundColor: `${props.rgb.normal}`,
    borderRadius: '10px',
  }),
  special: (props) => ({
    backgroundColor: `${props.rgb.special}`,
  }),
});

export default function Board(props) {
  const { gameLevel, callBack } = props;

  const cubeWrongRef = React.useRef();
  const cubeRightRef = React.useRef();

  const handleCubeClick = () => callBack('wrong');
  const handleCubeSpecialClick = () => callBack('right');

  const simulateRightClick = () => {
    cubeRightRef.current.click();
  };

  const simulateWrongClick = () => {
    cubeWrongRef?.current?.click();
  };

  if (!window.rightClick) window.rightClick = simulateRightClick;
  if (!window.wrongClick) window.wrongClick = simulateWrongClick;

  const size = levelGrid(gameLevel);
  const gridSize = size * size;

  const rgb = levelRandomColor(gameLevel);
  const style = makeStyleFunc({ size, rgb });
  const grid = new Array(gridSize).fill(0);
  const special = getRandomInt(0, gridSize);
  return (
    <Paper className={style.grid} elevation={3}>
      {grid.map((_, index) => (
        <Paper
          key={`cube-${index + 1}`}
          ref={(index === special) ? cubeRightRef : cubeWrongRef}
          className={(index === special) ? `${style.cube} ${style.special}` : style.cube}
          onClick={(index === special) ? handleCubeSpecialClick : handleCubeClick}
        />
      ))}
    </Paper>
  );
}
