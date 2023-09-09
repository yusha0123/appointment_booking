const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(
  "/api/",
  cors({
    origin: "http://127.0.0.1:5500",
  }),
  routes
);

app.get("/", (req, res, next) => {
  res.send("Hello From Express!");
});

app.listen(3000, () => console.log("Server is Running at Port: 3000"));
