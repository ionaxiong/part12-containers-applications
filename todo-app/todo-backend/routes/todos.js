const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");
const { toDoCounter } = require("../util");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const count = await redis.getAsync("todos");
  if (todo) {
    await redis.setAsync("todos", toDoCounter(count));
    res.send(todo);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    res.send(req.todo);
  } catch (error) {
    console.error(error);
    res.sendStatus(405);
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    const { text, done } = req.body;
    const { todo } = req;
    todo.text = text;
    todo.done = done;
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.sendStatus(405);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
