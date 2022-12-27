const upload = require("multer")();

const bucketStorage = require("../lib/firebase.storage");
const { response } = require("./response");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async uploadProfileImage(res, path, file) {
    
    // path: use "profile" folder for upload profile image or store image
    // path: use "store" folder for upload store image 

    return new Promise((resolve, reject) => {
      if (!["png", "jpg", "jpeg"].includes(file.mimetype.split("/")[1])) {
        return res.status(400).send(response("only png and jpg are allow"));
      }
      if (file.size > 2 * 1000 * 1000) {
        return res.status(400).send(response("file size limit is 2Mb"));
      }

      const fileName = uuidv4()
        .concat(".")
        .concat(file.originalname.split(".")[1]);

      const fileUpload = bucketStorage().file(`${path}/${fileName}`);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          firebaseStorageDownloadTokens: null,
        },
      });

      stream.on("error", (error) => {
        console.log(error);
        return res
          .status(400)
          .send(
            response("Something is wrong! Unable to upload at the moment.")
          );
      });

      stream.on("finish", async () => {
        console.log("successful upload");
        const url = `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${path}%2F${fileName}?alt=media`;
        resolve(url);
      });

      stream.end(file.buffer);
    });
  },
};
