const express = require("express")
const userData = require("../controller/user")

const router = express.Router();

router.get('/', userData.data)
router.post('/create', userData.createEmail)

module.exports = router