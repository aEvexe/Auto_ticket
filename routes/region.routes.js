const { addRegion, getAll, update, remove } = require('../controllers/region.controller')

const router = require('express').Router()

router.post("/", addRegion);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router