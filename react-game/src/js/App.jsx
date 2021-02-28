import React from 'react';
import useSound from 'use-sound';

import musicFile from '../assets/sounds/music.mp3';

import Top from './components/Top/Top';
import Center from './components/Center/Center';
import Bottom from './components/Bottom/Bottom';

export default function App() {
  const [soundValue, soundSetValue] = React.useState(20);
  const [musicValue, musicSetValue] = React.useState(0);
  const [play, { pause, isPlaying }] = useSound(musicFile, {
    volume: musicValue / 100,
    autoplay: true,
    loop: true,
  });

  const [difficultyValue, difficultySetValue] = React.useState(0);
  const [colorValue, colorSetValue] = React.useState('primary');
  const [languageValue, languageSetValue] = React.useState('en');

  const handleSoundChange = (event, newValue) => soundSetValue(newValue);
  const handleMusicChange = (event, newValue) => {
    musicSetValue(newValue);
    if (!newValue) pause();
    if (newValue && !isPlaying) play();
  };

  const handleDifficultyChange = (event, newValue) => {
    if (newValue !== null) difficultySetValue(newValue);
  };

  const handleColorChange = (event, newValue) => {
    if (newValue !== null) colorSetValue(newValue);
  };

  const handleLanguageChange = (event, newValue) => {
    if (newValue !== null) languageSetValue(newValue);
  };

  const settings = {
    sound: {
      value: soundValue,
      callBack: handleSoundChange,
    },
    music: {
      value: musicValue,
      callBack: handleMusicChange,
    },
    difficulty: {
      value: difficultyValue,
      callBack: handleDifficultyChange,
    },
    color: {
      value: colorValue,
      callBack: handleColorChange,
    },
    language: {
      value: languageValue,
      callBack: handleLanguageChange,
    },
  };

  return (
    <div className="app">
      <Top settings={settings} />
      <Center />
      <Bottom settings={settings} />
    </div>
  );
}
