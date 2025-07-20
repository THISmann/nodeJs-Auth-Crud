const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024; 
const fs = require('fs');
const path = require('path');  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log(`${__dirname}`);
      // const filePath = path.join("/", file.originalname);
      // fs.writeFileSync(filePath, file.originalname);
      cb(null,  "/Users/fuhetienne/Documents/test/node/uploads");
    } catch (e) {
      cb(e);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;