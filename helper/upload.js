let multer = require('multer')

const fileFilter = (req, file, cb) => {
  // console.log(file.fieldname.startsWith('image'), 'image')
  // console.log(file.fieldname.startsWith('dokumen'), 'dokumen')
  // console.log('file', file)
  if (file.fieldname.startsWith('dokumen')) {
    // Only allow PDF files for fields starting with 'dokumen'
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for dokumen fields'), false);
    }
  } else if (file.fieldname.startsWith('image')) {
    // Only allow image files (jpg, jpeg, png) for fields starting with 'image'
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG) are allowed for image fields'), false);
    }
  } else {
    // Reject files that don't match the required fieldname prefixes
    cb(new Error('Invalid file fieldname'), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('jalan')
    if (file.fieldname.startsWith('dokumen')) {
      cb(null, './public/dokumen/'); // Folder untuk dokumen
    } else if (file.fieldname.startsWith('image')) {
      cb(null, './public/image/'); // Folder untuk gambar
    }
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const formattedDate = timestamp.slice(0, 14); // YYYYMMDDHHMMSS
    const originalName = file.originalname;
    cb(null, `${formattedDate}-${Math.round(Math.random() * 1E9)}-${originalName}`);
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
})

module.exports = upload