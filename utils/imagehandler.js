const path = require("path");
const fs = require("fs");

const basePath = path.join(__dirname, "../api");

function getRandomImg() {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        randomImg = Math.ceil(Math.random() * data.length);
        resolve(randomImg);
      }
    });
  });
}

function returnSpecificImage(img) {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let imgPosition = data.indexOf(`${img}.jpg`);

        if (imgPosition != -1) {
          resolve(data[imgPosition]);
        } else {
          reject("Not found");
        }
      }
    });
  });
}

module.exports = {
  getRandomImg,
  returnSpecificImage,
};
