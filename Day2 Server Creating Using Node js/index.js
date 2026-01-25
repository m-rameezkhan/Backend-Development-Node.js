const { stat } = require("fs");
const http = require("http");

let server = http.createServer((req, res) => {

    if(req.url === "/") {
        res.end("This is the home page");
    } else if(req.url === "/about") {
        let object = {
            status: 1,
            data:[
                {name: "John", age: 30},
                {name: "Jane", age: 25},
                {name: "Doe", age: 22},
            ]
        }
        res.end(JSON.stringify(object));
    } else {
        res.end("404 Page Not Found");
    }
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});