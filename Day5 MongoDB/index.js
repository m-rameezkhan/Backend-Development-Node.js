let express = require('express');
const { dbConnection } = require('./dbConnections');
let app = express();
const { ObjectId } = require('mongodb');

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/student-View", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    let data = await studentCollection.find().toArray();

    let resObj = {
        status: 1,
        message: "Data Fetched Successfully",
        data: data
    }
    res.send(JSON.stringify(resObj));
});

app.post("/student-Insert", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    // await studentCollection.insertOne(req.body);

    let obj = await {
        sName: req.body.sName,
        sEmail: req.body.sEmail,
    }
    let emailCheck = await studentCollection.findOne({ sEmail: obj.sEmail });
    // console.log("Email: ", emailCheck);
    if (emailCheck) {
        let resObj = {
            status: 0,
            message: "Email already exists",
        }
        res.send(JSON.stringify(resObj));
    }
    else {
        await studentCollection.insertOne(obj);
        let resObj = {
            status: 1,
            message: "Data Inserted Successfully",
            data: obj
        }
        res.send(JSON.stringify(resObj));
    }

});

app.delete("/student-Delete/:id", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");

    let id = req.params.id;
    let delres;

    // Case 1: Email
    if (typeof id === "string" && id.includes("@")) {
        delres = await studentCollection.deleteOne({ sEmail: id });
    }

    // Case 2: MongoDB ObjectId
    else if (ObjectId.isValid(id)) {
        delres = await studentCollection.deleteOne({ _id: new ObjectId(id) });
    }

    // Invalid
    else {
        return res.json({
            status: 0,
            message: "Invalid ID format"
        });
    }

    // Nothing deleted
    if (delres.deletedCount === 0) {
        return res.json({
            status: 0,
            message: "No record found"
        });
    }

    // Success
    res.json({
        status: 1,
        message: "Data Deleted Successfully",
        deletedCount: delres.deletedCount
    });
});

app.put("/student-Update/:id", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    let id = req.params.id;
    let { sName, sEmail } = req.body;

    let obj = {};
    if (sName !== null && sName !== undefined) {
        obj["sName"] = sName;
    }
    if (sEmail !== null && sEmail !== undefined) {
        obj["sEmail"] = sEmail;
    }

    let updateRes = await studentCollection.updateOne({ _id: new ObjectId(id) }, { $set: obj });
    res.json({
        status: 1,
        message: "Data Updated Successfully",
        updateRes
    });
});

    app.listen(3000, () => {
        console.log("Server is running on port 3000 http://localhost:3000");
    });
