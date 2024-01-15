const express = require("express");
const statisticsRouter = express.Router();
const redis = require("../redis");

statisticsRouter.get("/", async (req, res) => {
  const added_todos = await redis.getAsync("todos");
  res.send({
    added_todos: added_todos,
  });
});

module.exports = statisticsRouter;