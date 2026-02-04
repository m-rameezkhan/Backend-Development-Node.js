let express = require('express');
let mongoose = require('mongoose');
const router = require('./App/routes/userRoutes');
require('dotenv').config();
let CORS = require('cors')

let app = express();
app.use(CORS());

app.use(express.json());

app.use("/", router);
app.use("/api", router);

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});