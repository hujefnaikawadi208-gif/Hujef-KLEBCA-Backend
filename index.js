const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const cookie = require("cookie-parser");
const routes = require("./Routes/index");
const errorHandler = require("./middleware/ErrorHandler");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/passportConfig");
app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Get method" });
});

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected successfull");
  })
  .catch((error) => {
    console.log("Error in db connection");
  });
app.use((req, res, next) => {
  const error = new Error(`${req.originalUrl} is not available in the server.`);
  error.statusCode = 404;
  next(error);
});
app.listen(PORT, () => {
  console.log("Server is running in the Port", PORT);
});
