import { currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

interface PropMusicCard {
  music: Music;
}

export const MusicCard: React.FC<PropMusicCard> = ({ music }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  //  const [currentSound, setCurrentSound] = useAtom(currentSoundAtom);
  const [play, { pause, duration, sound }] = useSound(music.musicPath);

  const onPlayClick = () => {
    //setCurrentSound(music);
    setIsPaused(false);
    play();
  };

  const onPauseClick = () => {
    setIsPaused(true);
    pause();
  };

  // useEffect(() => {
  //   setIsPaused(currentSound?._id !== music._id);
  // }, [currentSound]);

  return (
    <div>
      <img
        src={music.posterPath}
        className="object-fill h-48 w-48 hover:scale-95"
      />
      {isPaused ? (
        <button onClick={onPlayClick}>play</button>
      ) : (
        <button onClick={onPauseClick}>pause</button>
      )}
    </div>
  );
};
