const multer = require("multer");
var upload = multer({ dest: 'uploads/' })

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const uploadSingle = async (req, res, next) => {
  try {
    console.log(req.body);
    if(req.file)
      upload.single(req);

    next();
  }
  catch(err) {
    return res.send({status: false, msg: "file upload error"});
  }
}

export default {uploadSingle}

// app.post(
//   "/upload",
//   upload.single("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.file.path;
//     const targetPath = path.join(__dirname, "./uploads/image.png");

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(200)
//           .contentType("text/plain")
//           .end("File uploaded!");
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// );