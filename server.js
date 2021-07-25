const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/user-router')

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;
const DB ="mongodb+srv://user-management-db:usermanagementdb@cluster0.2mvva.mongodb.net/user-management-db?retryWrites=true&w=majority"



mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true }).then( () => {
    httpServer.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch( err =>{
    console.log('Cannot Connect to DATABASE.')
})


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(userRouter);
app.get('/', (req,res)=>{
    res.send({
        message : "Welcome to User Management System."
    })
})
