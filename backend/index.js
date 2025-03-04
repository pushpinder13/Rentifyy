const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dotenv = require('dotenv');
dotenv.config()

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.send("hlo");
});

//listen port
app.listen(process.env.PORT, () => {
    
    console.log(`Running on: http://localhost:${process.env.PORT}`);
});