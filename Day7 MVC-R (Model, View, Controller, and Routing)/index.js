let express = require("express");
let mongoose = require("mongoose");
const { userInsert, userList, userDelete, userUpdate, homePage } = require("./App/controller/web/userController");
const expressRouter = require("./App/routes/web/userRoutes");
const dbConnection = require("./App/config/dbConnection");

let app = express();

app.use(express.json());

app.use("/", expressRouter);

dbConnection();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});