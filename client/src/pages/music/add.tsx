import music from "@/api/actions/music";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

interface InputsType {
  title: string;
  poster: FileList;
  music: FileList;
}

const AddMusic = () => {
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

  // onUploadProgress: (progressEvent) => {
  //   setUploadProgress(
  //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //   );
  // },

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    uploadMusicMutation.mutate(data);
  });

  return (
    <div className="w-full min-h-screen max-h-auto pt-40">
      <div className="w-[900px] flex justify-center bg-neutral-400">
        <form className=" flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              {...register("title", {
                required: { value: true, message: "required" },
              })}
            />
          </label>
          <label htmlFor="poster">
            Poster:
            <input type="file" id="poster" {...register("poster")} />
          </label>
          <label htmlFor="sound">
            Sound;
            <input
              type="file"
              id="sound"
              {...register("music", {
                required: { value: true, message: "required" },
              })}
            />
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddMusic;
