import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = "./public/temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WEBP images are allowed"), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits
});










// but ye achi practice nhi hai kyuki same name ki kayi files aajayein toh wo overwrite ho jayengi

// but operation is for tiny amount of time on server pe , thodi der ke liye rhegi wo file and then phir hum usko cloudinary pe upload krdenge

// we can minor functionality later

// cb se humein return mein filename meil jayega , toh localpath wali kahani humari yaha se solve hojati hai , localpath humare pass aa jayega

// cb parameters padh skte h , agar humein filename change krna hai unique rkhna hai

// har ek filename kis tarike se rkhna h woh humare upar h isko aur advanced kiya jaa skta hai

// isko aur advanced kiya ja skta hai , hum kayi baar dekhenge file ka name unique id se rkha jata h , nano id ( numbers , character ke string ) se rkha jata hai

// unique suffix ::

// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) like this
