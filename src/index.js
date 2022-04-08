const express = require("express");
const con = require("./db/db_config.js");
const textRoute = require("./routers/textRoute");
const userRoute = require("./routers/userRoute");


const app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(textRoute);
app.use(userRoute);
const PORT = process.env.PORT || 3001;

con.on("open", () => {
  // console.log("CONNECTED WITH DB...");
});

app.listen(PORT, () => {
  // console.log("running on PORT 3001");
});
