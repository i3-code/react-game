import React, { useEffect, useReducer } from 'react';
import useSound from 'use-sound';

import musicFile from '../assets/sounds/music.mp3';

import Top from './components/Top/Top';
import Center from './components/Center/Center';
import Bottom from './components/Bottom/Bottom';

const cookieVersion = 1;
const settings = JSON.parse(localStorage.getItem('react-game-settings-2021q1')) || {
  sound: 20,
  music: 10,
  difficulty: 0,
  color: 'primary',
  locale: 'en',
  level: 0,
  score: 0,
  time: 0,
  lives: 0,
  cookieVersion,
};
const savedVersion = settings.cookieVersion;
if (savedVersion !== cookieVersion) localStorage.clear();

function reducer(state, action) {
  const { type, value } = action;
  if (!type) throw new Error('Unknown action');
  const newState = {
    ...state,
    [type]: value,
  };
  localStorage.setItem('react-game-settings-2021q1', JSON.stringify(newState));
  return newState;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, settings);
  const { music } = state;

  const [play, { pause, isPlaying }] = useSound(musicFile, {
    volume: music / 100,
    loop: true,
  });

  useEffect(() => {
    if (!music) pause();
    if (music && !isPlaying) play();
  });

  const callBacks = {
    sound: (event, value) => dispatch({ type: 'sound', value }),
    music: (event, value) => dispatch({ type: 'music', value }),
    difficulty: (event, value) => dispatch({ type: 'difficulty', value }),
    color: (event, value) => dispatch({ type: 'color', value }),
    locale: (event, value) => dispatch({ type: 'locale', value }),
    dispatch,
  };

  const appSettings = {
    settings: state,
    callBacks,
  };

  return (
    <div className="app">
      <Top data={appSettings} />
      <Center />
      <Bottom data={appSettings} />
    </div>
  );
}
