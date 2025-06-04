const { addRole, getAll, update, remove } = require('../controllers/role.controller')

const router = require('express').Router()

router.post("/", addRole);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router