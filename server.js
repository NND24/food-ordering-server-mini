const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./config/connectDB");
const http = require("http");
const morgan = require("morgan");

const authRoute = require("./services/auth/auth.routes");
const userRoute = require("./services/user/user.routes");
const storeRoute = require("./services/store/store.routes");
const foodTypeRoute = require("./services/foodType/foodType.routes");
const cartRoute = require("./services/cart/cart.routes");

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/foodType", foodTypeRoute);
app.use("/api/v1/cart", cartRoute);

app.use(errorHandler);

PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
