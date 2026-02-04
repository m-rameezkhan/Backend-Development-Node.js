const userModel = require("../models/user.model");

let homePage = (req, res) => {
    res.send('Welcome to the User Management System');
}

let userInsert = (req, res) => {
    let { name, email, age, phone } = req.body;
    let userData = new userModel({ name, email, age, phone });

    userData.save()
        .then((savedUser) => {
            res.status(201).json({
                status: 1,
                message: "User data inserted successfully",
                data: savedUser
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                return res.status(409).json({
                    status: 0,
                    message: "Email already exists. Please use a different email."
                });
            }

            res.status(500).json({
                status: 0,
                message: "Error inserting user data",
                error: err.message
            });
        });
};


let userView = (req, res) => {
    userModel.find().then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.send({
            status: 0,
            message: 'Error retrieving user data: ' + err
        });
    });
}

let userDelete = (req, res) => {
    let userId = req.params.id;
    userModel.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: 1, message: 'User deleted successfully' });
    }).catch((err) => {
        res.send({
            status: 0,
            message: 'Error deleting user: ' + err
        });
    });
}

let updatedUser = (req, res) => {
    let userId = req.params.id;
    let { name, email, age, phone } = req.body;
    let updatedUserData = { name, email, age, phone };
    userModel.findByIdAndUpdate(userId, updatedUserData).then(() => {
        res.status(200).send({ status: 1, message: 'User updated successfully' });
    }).catch((err) => {
        res.send({
            status: 0,
            message: 'Error updating user: ' + err
        });
    });
}

module.exports = { userInsert, homePage, userView, userDelete, updatedUser };