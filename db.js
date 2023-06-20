const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = mongoose.connect(process.env.MONGODBURL);

module.exports = {
    dbConnection
}
