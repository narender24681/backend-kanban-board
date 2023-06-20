const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  name: {type: String},
  tasks: {type: []}
});

const BoardModel = mongoose.model("board", boardSchema);

module.exports = {
    BoardModel
}
