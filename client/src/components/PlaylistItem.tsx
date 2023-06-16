import { currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useCallback } from "react";
import { AnimationPlayed } from "./AnimationPlayed";

interface PropPlaylistItem {
  music: Music;
}

export const PlaylistItem: React.FC<PropPlaylistItem> = ({ music }) => {
  const [currSound, setCurrSound] = useAtom(currentSoundAtom);

  const onSoundClick = useCallback(() => {
    if (currSound?._id !== music._id) {
      setCurrSound(music);
    }
  }, [music]);

  return (
    <div
      className={`flex justify-between border-b border-t py-3 px-6 cursor-pointer hover:border-black ${
        music._id === currSound?._id ? "bg-neutral-400 bg-opacity-50" : ""
      }`}
      onClick={onSoundClick}
    >
      <div className="flex items-center gap-3">
        <Image
          src={music.posterPath}
          alt={music.title}
          width={300}
          height={300}
          className="w-[100px] h-[100px] rounded-full border border-black"
        />
        <div>{music.title}</div>
      </div>
      <div className="mx-2 my-auto">
        {music._id === currSound?._id ? <AnimationPlayed /> : null}
      </div>
    </div>
  );
};
