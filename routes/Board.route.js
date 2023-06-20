const express = require("express");
const { BoardModel } = require("../models/Board.model");
const boardRouter = express.Router();

boardRouter.get("/tasks", async (req, res) => {
    try {
        const boards = await BoardModel.find();
        console.log(boards);
        res.status(200).send(boards);
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});



boardRouter.post("/tasks", async (req, res) => {
    // console.log(req.body);

    try {
        const board = new BoardModel(req.body);
        await board.save();
        // console.log(board);

        res.status(200).send({"msg": "Task created successfully"});
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});


module.exports = {
    boardRouter
}
