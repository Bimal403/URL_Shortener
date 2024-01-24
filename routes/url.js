const router = require("express").Router();
const urlCtrl = require("../controllers/url");

router.post("/", urlCtrl.handleGenerateNewShortUrl);

router.get("/:shortId", urlCtrl.redirectLink);

router.get("/analytics/:shortId", urlCtrl.createAnalytics);

module.exports = router;
