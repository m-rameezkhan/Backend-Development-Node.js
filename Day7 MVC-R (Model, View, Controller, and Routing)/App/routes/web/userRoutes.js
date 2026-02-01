let express = require("express");

let expressRouter = require("express").Router();
const { userInsert, userList, userDelete, userUpdate, homePage } = require("../../controller/web/userController");

expressRouter.get("/", homePage);
expressRouter.post("/user-insert", userInsert);
expressRouter.get("/user-list", userList); 
expressRouter.delete("/user-delete/:id", userDelete);
expressRouter.put("/user-update/:id", userUpdate);

module.exports = expressRouter;

