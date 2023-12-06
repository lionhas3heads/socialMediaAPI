const mongoose = require('mongoose');

const dbName = 'socialmediaDB';

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);

module.exports = mongoose.connection;
