const express = require("express");
const port = 8000;
const cors = require("cors");
const studentRoute = require("./routes/student");
const scheduleRoute = require("./routes/schedule");
const cookieSession = require("cookie-session");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

console.log("__dirname", __dirname);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/api/students", studentRoute);
app.use("/api/schedule", scheduleRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}`)
);
