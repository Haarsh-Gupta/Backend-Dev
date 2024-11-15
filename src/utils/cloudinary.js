import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("NOT A VALID LOCAL PATH");
      return null;
    }
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded succesfully
    // console.log(response);
    console.log("FILE UPLOADED SUCCESFULLY!!!");
    return response;
  } catch (error) {
    console.log("FILE UPLOAD FAILED");
    return null;
  } finally {
    fs.unlinkSync(localFilePath); // remove the locally save temporary file as the upload operation got failed! or succesfull
    console.log("File deleted from localpath");
  }
};

export { uploadOnCloudinary };
