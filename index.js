require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const { returnSpecificImage, getRandomImg } = require("./utils/imagehandler");

const { json, response, request } = require("express");

app.use(json());

//handle wallpaper route

app.get("/wallpaper", (request, response) => {
  let urlQueryParam = request.query.img;

  if (urlQueryParam) {
    returnSpecificImage(urlQueryParam)
      .then((data) => {
        const sendFileOptions = {
          root: path.join(__dirname, "api"),
        };

        response.sendFile(data, sendFileOptions, (err) => {
          if (err) {
            return response.json({
              error: "Please contact site owner",
            });
          }
        });
      })
      .catch((err) => {
        return response.json({
          error: `image id ${urlQueryParam} not found`,
        });
      });
  } else {
    getRandomImg().then((data) => {
      response.json({
        url: `http://${process.env.IP}:8080/wallpaper?img=${data}`,
      });
    });
  }
});

//Route not found manager
app.get("*", (request, response) => {
  return response.send(`<p>Nothing for this route</p>`);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
