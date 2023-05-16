const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, `${__dirname}/../../uploads`);
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, file.originalname);
  },
});

module.exports = storage;
