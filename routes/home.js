var express = require("express");
var router = express.Router();
let multer = require("multer");
let upload = multer();

router.post("/", upload.fields([]), (req, respond) => {
  //separating each log
  const data = req.body.data.split("}\r");
  var result = [];
  data.forEach((elem) => {
    result = [...result, elem.split(" - ")];
  });

  //structuring and cleaning each log
  var res = [];
  result.forEach((item, index) => {
    if (item.length >= 3) {
      const last = index !== result.length - 1 ? item[2] + "}" : item[2];
      var elem = [
        item[0].replace(/\n/g, "").replace(/\r/g, ""),
        item[1],
        last.replace(/\n/g, "").replace(/\r/g, ""),
      ];
      res = [...res, elem];
    }
  });

//   preparing response in required format
  let response = [];
  res.forEach((elem) => {
    let format = {
      timestamp: Date.parse(elem[0]),
      loglevel: elem[1],
      ...JSON.parse(elem[2]),
    };
    response = [...response, format];
  });

  respond.json(response);
});

module.exports = router;
