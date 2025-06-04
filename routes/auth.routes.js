const { login, logout, refresh } = require('../controllers/auth.controller')

const router = require('express').Router()

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
// router.delete("/:id", remove);

module.exports = router