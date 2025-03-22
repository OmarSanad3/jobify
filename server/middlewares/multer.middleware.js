import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now().toString() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
