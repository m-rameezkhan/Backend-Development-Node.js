let express = require("express");

let app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send({status: "OK", message: "This is the home page"});
})

app.get("/news/:id", (req, res) => {
    res.send({status: "OK", message: "This is item No. " + req.params.id});
})

app.get("/about", (req, res) => {
    res.send({status: "OK", message: "This is the About page"});
})


app.post("/login", (req, res) => {

    res.status(200).json(
        {
            status: "OK",
            message: "data received", 
            bodyData: req.body,
            queryData: req.query
        });
})

app.listen(3000)