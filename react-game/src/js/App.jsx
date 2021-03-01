import React, { useEffect } from 'react';
import useSound from 'use-sound';

import musicFile from '../assets/sounds/music.mp3';

import Top from './components/Top/Top';
import Center from './components/Center/Center';
import Bottom from './components/Bottom/Bottom';

const cookieVersion = 1;
const settings = JSON.parse(localStorage.getItem('react-game-settings-2021q1')) || {
  sound: { volume: 20 },
  music: { volume: 10 },
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

function modSettings(oldSettings, newSettings) {
  const objLink = oldSettings;
  Object.entries(newSettings).forEach(([key, value]) => {
    const origValue = objLink[key];
    if (typeof origValue !== 'object') {
      objLink[key] = value;
    } else {
      modSettings(origValue, value);
    }
  });
}

function saveSettings(newSettings) {
  modSettings(settings, newSettings || {});
  localStorage.setItem('react-game-settings-2021q1', JSON.stringify(settings));
}
settings.saveSettingsCallBack = saveSettings;

export default function App() {
  const { music } = settings;
  const [musicValue, musicSetValue] = React.useState(music.volume);

  const [play, { pause, isPlaying }] = useSound(musicFile, {
    volume: musicValue / 100,
    autoplay: true,
    loop: true,
  });

  const handleMusicChange = (volume) => {
    musicSetValue(volume);
    saveSettings({ music: { volume } });
    if (!volume) pause();
    if (volume && !isPlaying) play();
  };

  useEffect(() => {
    music.changeCallBack = handleMusicChange;
  }, []);

  return (
    <div className="app">
      <Top settings={settings} />
      <Center />
      <Bottom settings={settings} />
    </div>
  );
}
