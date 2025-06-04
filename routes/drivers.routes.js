const { addDriver, getAll, update, remove } = require('../controllers/drivers.controller')

const router = require('express').Router()

router.post("/", addDriver);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router