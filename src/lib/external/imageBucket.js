// FIX This
const CLOUD_NAME = "ddomk0jqi";
const UPLOAD_PRESET = "ktb-community";

export const uploadToImageBucket = async file => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    console.error("Cloudinary 응답 오류:", data);
    throw new Error("업로드 실패");
  }
};
