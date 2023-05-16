import music from "@/api/actions/music";
import { currentSoundAtom, userAtom } from "@/atom";
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
  const [currSound] = useAtom(currentSoundAtom);

  const getMusicMutations = useMutation(music.getMusic, {
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
        {currSound ? (
          <MusicCard music={currSound} bgColor="bg-red-500" />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
