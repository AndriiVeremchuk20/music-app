import { currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import Image from "next/image";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { FaPlay } from "react-icons/fa";

interface PropMusicCard {
  music: Music;
  bgColor?: string;
}

export const MusicCard: React.FC<PropMusicCard> = ({ music, bgColor }) => {
  // const [isPaused, setIsPaused] = useState<boolean>(true);
  // //  const [currentSound, setCurrentSound] = useAtom(currentSoundAtom);
  // const [play, { pause, duration, sound }] = useSound(music.musicPath);

  // const onPlayClick = () => {
  //   //setCurrentSound(music);
  //   setIsPaused(false);
  //   play();
  // };

  // const onPauseClick = () => {
  //   setIsPaused(true);
  //   pause();
  // };

  const [showPlay, setShowPlay] = useState<boolean>(false);

  const handleMouseHover = () => {
    setShowPlay(true);
  };
  const handleMouseLeave = () => {
    setShowPlay(false);
  };

  return (
    <div
      onMouseOut={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseHover}
      className="w-48 h-48 flex flex-col rounded-md bg-center bg-cover bg-no-repeat hover:bg-opacity-50"
      style={{ backgroundImage: `url(${music.posterPath})` }}
    >
      {showPlay ? (
        <div className="flex flex-col w-full h-full bg-slate-600 bg-opacity-40 rounded-t-md">
          <FaPlay className="m-auto text-3xl fill-white cursor-pointer" />
        </div>
      ) : null}
      <div
        className={`${
          bgColor ? bgColor : "bg-neutral-700"
        } text-white font-medium px-3 py-1 ${
          showPlay ? "rounded-b-md" : "rounded-t-md"
        } `}
      >
        {music.title}
      </div>
    </div>
  );
};
