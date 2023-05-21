import { currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useCallback } from "react";

interface PropPlaylistItem {
  music: Music;
}

export const PlaylistItem: React.FC<PropPlaylistItem> = ({ music }) => {
  const [, setSound] = useAtom(currentSoundAtom);

  const onSoundClick = useCallback(() => {
    setSound(music);
  }, [music]);

  return (
    <div
      className="flex border-b border-t py-3 px-6 hover:opacity-50"
      onClick={onSoundClick}
    >
      <Image
        src={music.posterPath}
        alt={music.title}
        width={300}
        height={300}
        className="w-[60px] h-[60px]"
      />
      <div>{music.title}</div>
    </div>
  );
};
