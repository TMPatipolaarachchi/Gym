const mongoose = require('mongoose');

const session = require('express-session');
const MongodDBStore = require('connect-mongodb-session')(session);

const dburl = "mongodb+srv://tmpatipolaarachchi:2455455@cluster0.kw8akcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const store = new MongodDBStore({
    uri:dburl,
    collection: 'sessions'

});

mongoose.set("strictQuery", true)

const dbconnect = async () => {
    try{
        await mongoose.connect(dburl);
        console.log("mongodb successfully connected");
    }catch(e){
        console.error("mongodb not connected",e);
        process.exit();
    }
}

module.exports = {dbconnect, store};