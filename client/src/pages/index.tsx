import music from "@/api/actions/music";
import { userAtom } from "@/atom";
import { Menu } from "@/components/Menu";
import { Music } from "@/types/music";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [musicList, setMusicList] = useState<Array<Music>>([]);

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
    <div className="w-full min-h-screen max-h-auto">
      <div className="pt-24">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt dicta
        nihil deleniti, repudiandae ratione eum quam alias ut nemo odit saepe.
        Maxime pariatur neque corrupti non. Maiores rerum amet quos!
      </div>
      <div>
        {musicList.map((item) => (
          <div key={item._id}>
            <div>{item.title}</div>
            <img src={item.posterPath} />
            <audio src={item.musicPath} controls/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
