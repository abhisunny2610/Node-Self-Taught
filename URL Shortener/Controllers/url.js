const shortid = require("shortid")
const URL = require("../Models/urls")

const generateNewShortURL = async (req, res) => {

    const body = req.body

    if (!body.url) return res.status(400).json({ error: "URL is required." })

    const shortID = shortid()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.json({ id: shortID })
}

const getDataWithShortURL = async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )

    res.redirect(entry.redirectURL)
}

const getAnalytics = async (req, res)=> {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = { generateNewShortURL, getDataWithShortURL, getAnalytics }