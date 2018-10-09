const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(
    keys.mongoURI, { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connect to MongoDB");
});