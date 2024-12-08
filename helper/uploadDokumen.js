let multer = require('multer')

const fileFilter = (req, file, cb) => {
  console.log('jalan 0', req.files)
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image Upload Problem"), false);
  }
};

const storage = multer.diskStorage({
  destination: './public/dokumen/',
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const formattedDate = timestamp.slice(0, 14); // YYYYMMDDHHMMSS
    const originalName = file.originalname;
    cb(null, `${formattedDate}-${originalName}`);
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
})

module.exports = upload