let express = require("express");
let mongoose = require("mongoose");
let env = require("dotenv").config();
let user = require("./models/dbmodel");

let app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/user-insert", async (req, res) => {
    const { name, email, age, phone } = req.body;
    const newUser = new user({ name, email, age, phone });
    await newUser.save().then(() => {
        res.send({status: 1, message:"User inserted successfully"});
    }).catch((err) => {
        res.send({status: 0, message:"Error inserting user:", err});
    });
});

app.get("/user-list", async (req, res) => {
    const users = await user.find();
    res.send(users);
}); 

app.delete("/user-delete/:id", async (req, res) => {
    const userId = req.params.id;

    // await user.findByIdAndDelete(userId).then(() => {
    //     res.send({status: 1, message:"User deleted successfully"});
    // }).catch((err) => {
    //     res.send({status: 0, message:"Error deleting user:", err});
    // });
    const delUser = await user.deleteOne({_id: userId});
    res.send({status: 1, message: "User Deleted", delUser});

});

app.put("/user-update/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, phone } = req.body;
    let updatedData = { name, email, age, phone };
    let updateRes = await user.updateOne({ _id: userId }, updatedData );
    res.send({ status: 1, message: "User updated successfully", updateRes });

});

mongoose.connect(process.env.DBURL)
.then(() => {
    console.log("Connected to the database successfully");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Error connecting to the database:", err);
});
