const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String, 
    name: String
});

module.exports = mongoose.model('users', userSchema);
