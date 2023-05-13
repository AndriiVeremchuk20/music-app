import { Music } from "@/types/music";
import React from "react";
import { MusicCard } from "./MusicCard";

interface PropMusicList {
  musicList: Array<Music>;
}

export const MusicList: React.FC<PropMusicList> = ({ musicList }) => {
  return (
    <div className="grid grid-cols-8 grid-flow-row-dense">
      {musicList.map((item) => (
        <MusicCard key={item._id} music={item} />
      ))}
    </div>
  );
};
