import React from 'react';

import Top from './components/Top/Top';
import Center from './components/Center/Center';
import Bottom from './components/Bottom/Bottom';

import { loadSettings } from './utils/storage';

export default function App() {
  const settings = loadSettings();
  const { color, locale } = settings;
  const [colorValue, colorSetValue] = React.useState(color);
  const [localeValue, localeSetValue] = React.useState(locale);

  const appSettings = { color: colorValue, locale: localeValue };

  const handleColorChange = (newValue) => {
    if (newValue !== null) colorSetValue(newValue);
  };

  const handleLocaleChange = (newValue) => {
    if (newValue !== null) localeSetValue(newValue);
  };

  const callBacks = {
    color: handleColorChange,
    locale: handleLocaleChange,
  };

  console.log('render - App');
  return (
    <div className="app">
      <Top appSettings={appSettings} callBacks={callBacks} />
      <Center appSettings={appSettings} />
      <Bottom appSettings={appSettings} />

    </div>
  );
}
