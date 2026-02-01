const mongoose = require("mongoose");
let env = require("dotenv").config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to the database successfully");
    } catch (err) {
        console.log("Error connecting to the database:", err);
        process.exit(1);
    }
};

module.exports = dbConnection;