import React from 'react';
import useSound from 'use-sound';

import musicFile from '../assets/sounds/music.mp3';

import Top from './components/Top/Top';
import Center from './components/Center/Center';
import Bottom from './components/Bottom/Bottom';

const cookieVersion = 1;
const settings = JSON.parse(localStorage.getItem('react-game-settings-2021q1')) || {
  language: 'en',
  sound: 20,
  music: 10,
  difficulty: 0,
  color: 'primary',
  level: 0,
  score: 0,
  time: 0,
  lives: 0,
  cookieVersion,
};

const savedVersion = settings.cookieVersion;
if (savedVersion !== cookieVersion) localStorage.clear();

function saveSettings(item, value) {
  if (item) settings[item] = value || 0;
  localStorage.setItem('react-game-settings-2021q1', JSON.stringify(settings));
}

export default function App() {
  const {
    sound,
    music,
    difficulty,
    color,
    language,
  } = settings;

  const [soundValue, soundSetValue] = React.useState(sound);
  const [musicValue, musicSetValue] = React.useState(music);
  const [play, { pause, isPlaying }] = useSound(musicFile, {
    volume: musicValue / 100,
    autoplay: true,
    loop: true,
  });

  const [difficultyValue, difficultySetValue] = React.useState(difficulty);
  const [colorValue, colorSetValue] = React.useState(color);
  const [languageValue, languageSetValue] = React.useState(language);

  const handleSoundChange = (event, newValue) => {
    soundSetValue(newValue);
    saveSettings('sound', newValue);
  };

  const handleMusicChange = (event, newValue) => {
    musicSetValue(newValue);
    if (!newValue) pause();
    if (newValue && !isPlaying) play();
    saveSettings('music', newValue);
  };

  const handleDifficultyChange = (event, newValue) => {
    if (newValue !== null) {
      difficultySetValue(newValue);
      saveSettings('difficulty', newValue);
    }
  };

  const handleColorChange = (event, newValue) => {
    if (newValue !== null) {
      colorSetValue(newValue);
      saveSettings('color', newValue);
    }
  };

  const handleLanguageChange = (event, newValue) => {
    if (newValue !== null) {
      languageSetValue(newValue);
      saveSettings('language', newValue);
    }
  };

  const appSettings = {
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
      <Top settings={appSettings} />
      <Center />
      <Bottom settings={appSettings} />
    </div>
  );
}
