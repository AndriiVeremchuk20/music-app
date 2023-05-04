import client from "..";

const baseRoutes = {
  upload: "music/",
};

const uploadMusic = async (data: FormData) => {

  const response = await client.post(baseRoutes.upload, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const music = {
  uploadMusic,
};

export default music;
