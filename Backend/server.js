const express = require('express');
const app = express();

const {dbconnect} = require('./config/db')

const bodyParser = require('body-parser');
const cors = require('cors');

const {store} = require('./config/db');
const session = require('express-session');

const machineroute = require('./route/machineroute');
const suplementroute = require('./route/suplementroute');
const authuserroute = require('./route/authuserroute');

dbconnect();

app.use(session({
    secret: '2455455',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 60 * 60 * 1000 * 2,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    }
}))

app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req,res) => res.send("hello"));

app.use("/api/authuser", authuserroute)
app.use("/api/machine", machineroute)
app.use("/api/suplement", suplementroute)

PORT = 3000;
app.listen(PORT, (req,res) => console.log(`server connected on port ${PORT}`));