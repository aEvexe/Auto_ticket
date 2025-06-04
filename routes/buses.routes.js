const { addBuses, getAll, update, remove } = require('../controllers/buses.controller')

const router = require('express').Router()

router.post("/", addBuses);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router