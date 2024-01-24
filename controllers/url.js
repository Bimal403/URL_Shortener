const generate = require("meaningful-string");
const URL = require("../models/url");
class UrlController {
  handleGenerateNewShortUrl = async (req, res) => {
    try {
      const body = req.body;
      if (!body.url) {
        return res.status(400).json({ error: "url is required" });
      }
      const shortID = generate.shortId({ charLength: 8 });
      console.log(shortID);
      await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
      });
      res.json({ id: shortID });
    } catch (e) {}
  };
  redirectLink = async (req, res) => {
    try {
      const shortId = req.params.shortId;
      const entry = await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
          $push: {
            visitHistory: { timestamp: Date.now() },
          },
        }
      );
      res.redirect(entry.redirectURL);
    } catch (e) {}
  };
  createAnalytics = async (req, res) => {
    try {
      const shortId = req.params.shortId;
      const result = await URL.findOne({ shortId });
      return res.json({ totalClicks: result.visitHistory.length });
    } catch (e) {}
  };
}
const urlCtrl = new UrlController();
module.exports = urlCtrl;
