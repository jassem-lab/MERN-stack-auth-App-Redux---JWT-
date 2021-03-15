const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const passport = require('passport')

const users = require('./routes/api/users')

require("dotenv").config();

const app = express();

const db = require('./config/keys').mongoURI;

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
} else {
   app.use(express.static('/client/build'))
}

//Passport Middleware
app.use(passport.initialize())

//Passport config
require('./config/passport')(passport);

//Routes
app.use("/api/users", users)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

mongoose.connect(db || process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB sucessfully connected")).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log("========================================")
    console.log(`Server has started running on port: ${PORT}`)
    console.log("========================================")
})