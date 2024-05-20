const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/jwtdemo').then((result) => {
    console.log('connected');
}).catch((err) => {
    console.log('error while connection',err);
    
});
app.use('/api/auth',require('./routes/auth_routes'));
app.use('/api/user',require('./routes/user_route'));
app.listen(27017,() => { console.log('server is listening on ${process.env.PORT}'); });
