const express = require("express");
const statisticsRouter = express.Router();
const redis = require("../redis");

statisticsRouter.get("/", async (req, res) => {
  const added_todos = await redis.getAsync("todos");
  if (!added_todos) {
    await redis.setAsync("todos", 0);
  }
  res.send({
    added_todos: added_todos,
  });
});

module.exports = statisticsRouter;
