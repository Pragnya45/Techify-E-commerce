export const imageToBase64 = async (image) => {
  if (!(image instanceof Blob)) {
    throw new Error("Parameter is not of type Blob");
  }

  const reader = new FileReader();
  reader.readAsDataURL(image);

  return await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
