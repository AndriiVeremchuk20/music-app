import client from "..";

const baseRoutes = {
  upload: "music/",
};

const uploadMusic = async (data: any) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("poster", data.poster[0]);
  formData.append("music", data.music[0]);

  const response = await client.post(
    baseRoutes.upload,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

const music = {
  uploadMusic,
};

export default music;
