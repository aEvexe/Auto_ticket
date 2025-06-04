const { addUserRole, getAll, update, remove } = require('../controllers/user-role.controller')

const router = require('express').Router()

router.post("/", addUserRole);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router