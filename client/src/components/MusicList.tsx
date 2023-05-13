import { Music } from "@/types/music";
import React from "react";
import { MusicCard } from "./MusicCard";

interface PropMusicList {
  musicList: Array<Music>;
}

export const MusicList: React.FC<PropMusicList> = ({ musicList }) => {
  return (
    <div>
      {musicList.map((item) => (
        <MusicCard key={item._id} music={item} />
      ))}
    </div>
  );
};
