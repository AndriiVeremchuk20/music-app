import { Music } from "@/types/music";
import React, { useCallback, useState } from "react";
import useSound from "use-sound";

interface PropMusicCard {
  music: Music;
}

export const MusicCard: React.FC<PropMusicCard> = ({ music }) => {
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [play, {pause, duration, sound }] = useSound(music.musicPath);


  const onPlayClick =()=>{
    setIsPaused(false);
    play();
  };

  const onPauseClick = ()=>{
    setIsPaused(true);
    pause();
  };


  return (
    <div>
      <img src={music.posterPath} className="object-fill h-48 w-48 hover:scale-95" />
      {
        isPaused?<button onClick={onPlayClick}>play</button>:<button onClick={onPauseClick}>pause</button>
      }
    </div>
  );
};
