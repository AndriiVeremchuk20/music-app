import musicApi from "@/api/actions/music";
import { currentPlaylistAtom, userAtom } from "@/atom";
import { Menu } from "@/components/Menu";
import { MusicCard } from "@/components/MusicCard";
import { MusicList } from "@/components/MusicList";
import { Music } from "@/types/music";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [musicList, setMusicList] = useState<Array<Music>>([]);
  const [currentPlaylist] = useAtom(currentPlaylistAtom);

  const getMusicMutations = useMutation(musicApi.getMusic, {
    onSuccess(data) {
      console.log(data);
      setMusicList(data.data);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    getMusicMutations.mutate();
  }, [user]);

  return (
    <div className="w-full min-h-screen max-h-auto pt-28 grid grid-cols-3">
      <div className="ml-4 col-span-2">
        <MusicList musicList={musicList} />
      </div>
      <div className="bg-slate-500 grid">
        {currentPlaylist.map((item) => (
          <div key={item._id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
