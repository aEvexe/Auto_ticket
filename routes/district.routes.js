const { getAll, update, remove, addDistrict } = require('../controllers/district.controller')

const router = require('express').Router()

router.post("/", addDistrict);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router