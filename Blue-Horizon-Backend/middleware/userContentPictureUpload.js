import multer from "multer";
import storage from "../cloudinaryContentPicture.js";

const upload = multer({ storage });

export default upload;
