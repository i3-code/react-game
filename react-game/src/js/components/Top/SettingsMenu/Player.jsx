import React, { useEffect } from 'react';
import useSound from 'use-sound';

import musicFile from '../../../../assets/sounds/music.mp3';

export default function Player(props) {
  const { music } = props;

  const [play, { pause, isPlaying }] = useSound(musicFile, {
    volume: music / 100,
    loop: true,
  });

  useEffect(() => {
    if (!music) pause();
    if (music && !isPlaying) play();
  }, [music, isPlaying]);

  return <div />;
}
