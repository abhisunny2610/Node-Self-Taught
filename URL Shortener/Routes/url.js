const express = require("express")
const router = express.Router()

const {generateNewShortURL, getDataWithShortURL, getAnalytics} = require('../Controllers/url')

router.post("/", generateNewShortURL)
router.get("/:shortId", getDataWithShortURL)
router.get('/analytics/:shortId', getAnalytics)

module.exports = router