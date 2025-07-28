import multer from "multer";
import storage from "../cloudinaryThumbnailPicture.js";

const upload = multer({ storage });

export default upload;
