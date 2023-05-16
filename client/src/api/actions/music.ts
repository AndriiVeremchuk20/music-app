import { Music } from "@/types/music";
import client from "..";
import { baseResponse } from "../types/baseResponse";

const baseRoutes = {
  get: "music/",
  getById: (id: string) => `music/${id}`,
  getUserMusic: (id: string) => `music/user/${id}`,
  upload: "music/",
};

const getMusic = async () => {
  const response = await client.get<baseResponse<Array<Music>>>(baseRoutes.get);
  return response.data;
};

const getMusicId = async ({ id }: { id: string }) => {
  const response = await client.get<baseResponse<Array<Music>>>(
    baseRoutes.getById(id)
  );
  return response.data;
};

const getUserMusic = async ({ id }: { id: string }) => {
  const response = await client.get<baseResponse<Array<Music>>>(
    baseRoutes.getUserMusic(id)
  );
  return response.data;
};

const uploadMusic = async (data: FormData) => {
  const response = await client.post<baseResponse<Music>>(
    baseRoutes.upload,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const musicApi = {
  getMusic,
  getMusicId,
  getUserMusic,
  uploadMusic,
};

export default musicApi;
