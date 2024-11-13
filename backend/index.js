const express = require ('express');
const app = express();
const bodyparser = require('body-parser'); // library to take user info to give to server
const cors = require('cors'); // to allow request from other port
const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
port = process.env.PORT || 5001;

app.get('/ping', (req,res)=>{
    res.send('PONG');
});

app.use(bodyparser.json());
app.use(cors());
// Use AuthRouter for authentication routes
app.use('/auth', AuthRouter)

app.listen(port, ()=>{
    console.log(`Server is lisetening on ${port}`);
});