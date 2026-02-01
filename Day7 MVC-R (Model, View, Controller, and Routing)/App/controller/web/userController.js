const user = require("../../models/dbmodel");

let homePage =  (req, res) => {
    res.send("Hello World!");
};

let userInsert = async (req, res) => {
    const { name, email, age, phone } = req.body;
    const newUser = new user({ name, email, age, phone });
    await newUser.save().then(() => {
        res.send({status: 1, message:"User inserted successfully"});
    }).catch((err) => {
        res.send({status: 0, message:"Error inserting user:", err});
    });
};

let userList =  async (req, res) => {
    const users = await user.find();
    res.send(users);
};

let userDelete = async (req, res) => {
    const userId = req.params.id;

    // await user.findByIdAndDelete(userId).then(() => {
    //     res.send({status: 1, message:"User deleted successfully"});
    // }).catch((err) => {
    //     res.send({status: 0, message:"Error deleting user:", err});
    // });
    const delUser = await user.deleteOne({_id: userId});
    res.send({status: 1, message: "User Deleted", delUser});
};

let userUpdate = async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, phone } = req.body;
    let updatedData = { name, email, age, phone };
    let updateRes = await user.updateOne({ _id: userId }, updatedData );
    res.send({ status: 1, message: "User updated successfully", updateRes });

};

module.exports = {
    homePage,
    userInsert,
    userList,
    userDelete,
    userUpdate
};