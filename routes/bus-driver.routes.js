const { addBusDriver, getAll, update, remove } = require('../controllers/bus-driver.controller')

const router = require('express').Router()

router.post("/", addBusDriver);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router