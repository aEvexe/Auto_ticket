const { addUser, getAll, update, remove } = require('../controllers/user.controller')

const router = require('express').Router()

router.post("/", addUser);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router