const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const employeeRoute = require("./routes/employeeRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use("/api/employees", employeeRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
