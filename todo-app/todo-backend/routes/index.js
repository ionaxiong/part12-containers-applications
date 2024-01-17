const express = require("express");
const router = express.Router();
const redis = require("../redis");
const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  // res.send("Hello World!");
  visits++;
  await redis.setAsync("visits", visits);
  res.send({
    ...configs,
    visits,
  });
});

// router.get("/todos", async (req, res) => {
//   res.send("Hello World!");
// });

module.exports = router;
