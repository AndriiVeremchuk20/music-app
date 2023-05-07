import music from "@/api/actions/music";
import { userAtom } from "@/atom";
import { Loader } from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";

interface InputsType {
  title: string;
  poster: FileList;
  music: FileList;
  genre: string;
  isPrivate: boolean;
}

const AddMusic = () => {
  const [user] = useAtom(userAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();

  const uploadMusicMutation = useMutation(music.uploadMusic, {
    onSuccess(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (user) {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("title", data.title);
      formData.append("poster", data.poster[0]);
      formData.append("music", data.music[0]);
      formData.append("genre", data.genre);
      formData.append("isPrivate", data.isPrivate + "");
      console.log(formData);
      uploadMusicMutation.mutate(formData);
    }
  });

  return (
    <div className="w-full min-h-screen max-h-auto pt-40">
      {uploadMusicMutation.isLoading ? <Loader /> : null}
      <div className="w-full flex justify-center">
        <form
          className="flex flex-col m-auto bg-white rounded-sm p-3"
          onSubmit={onSubmit}
        >
          <div className="text-2xl text-center mb-5">Add Music</div>
          <label htmlFor="title" className="border-b flex py-1 my-3">
            Title:
            <input
              type="text"
              id="title"
              className="w-full px-2 outline-none"
              {...register("title", {
                required: { value: true, message: "required" },
              })}
            />
          </label>
          <label htmlFor="poster" className="border-b flex py-1 my-3">
            Poster:
            <input
              type="file"
              id="poster"
              className="mx-1"
              {...register("poster")}
            />
          </label>
          <label htmlFor="sound" className="border-b flex py-1 my-3">
            Sound:
            <input
              type="file"
              id="sound"
              className="mx-1"
              {...register("music", {
                required: { value: true, message: "required" },
              })}
            />
          </label>
          <label htmlFor="genre" className="border-b flex py-1 my-3">
            Genre:
            <select
              id="genre"
              className="w-full bg-white outline-none mx-1"
              {...register("genre", {
                required: { value: true, message: "required" },
              })}
            >
              <option hidden>Select Genre</option>
              <option value="pop">Pop Music</option>
              <option value="rock">Rock Music</option>
              <option value="jazz">Jazz</option>
              <option value="blues">Blues</option>
              <option value="country">Country</option>
              <option value="hiphop">Hip-hop</option>
              <option value="rap">Rap</option>
              <option value="rnb">R&B</option>
              <option value="electronic">Electronic Music</option>
              <option value="reggae">Reggae</option>
              <option value="latin">Latin Music</option>
              <option value="funk">Funk</option>
              <option value="soul">Soul</option>
              <option value="classical">Classical Music</option>
            </select>
          </label>
          <label htmlFor="is-private" className="border-b flex py-1 my-3">
            Is private:
            <input
              type="radio"
              id="is-private"
              className="mx-1"
              {...register("isPrivate")}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-orange-400 p-1 hover:bg-opacity-40 my-1"
          >
            Post
          </button>
          <button
            type="reset"
            className="w-full bg-orange-400 p-1 hover:bg-opacity-40 my-1"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMusic;
