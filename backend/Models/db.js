const mongoose = require('mongoose');
require('dotenv').config();

const db_url = process.env.DATABASE_URL;
// console.log("Database URL:", Database_url);

mongoose.connect(db_url)
    .then(() => {
        console.log("DB CONNECTED");
        
    }).catch((err) => {
        console.log("DB not connected", err);
    });
