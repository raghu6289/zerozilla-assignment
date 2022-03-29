import mongoSetup from "./app/database/config.js";
import { router } from "./app/routes/routes.js";
import errorHandler from './app/middleware/globalErrorHandler.js'
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route

app.use("/api/v1/", router);
app.get('/', (req, res) => { res.send("Welcome to Zerozilla") })
app.use(errorHandler)

//PORT
const PORT = 5000;

//server
mongoSetup();

app.listen(process.env.PORT || PORT, () => {
  console.log("server is running at port ", PORT);
});
