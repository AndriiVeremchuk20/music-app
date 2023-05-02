import client from "..";

const baseRoutes = {
  upload: "music/",
};

const uploadMusic = async () => {
  const response = await client.post(baseRoutes.upload, {}, { headers: {} });
  return response.data;
};

const music = {
  uploadMusic,
};

export default music;
