const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var homeRouter = require("./routes/home");
app.use("/home", homeRouter);

app.listen(port, () => {
  console.log("Listining to port:", port);
});
