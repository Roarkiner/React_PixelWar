const express = require("express");
const { getGrid, getPixel, colorPixel } = require("../services/pixelService");
const { verifyJWT } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/grid", async (req, res) => {
	try {
		const grid = await getGrid();
		res.json(grid);
	} catch (err) {
		console.error("Error fetching grid:", err);
		res.status(500).json({ message: "Server error." });
	}
});

router.get("/pixel", async (req, res) => {
	const { positionX, positionY } = req.query;

	if (!positionX || !positionY) {
		return res.status(400).json({ message: "PositionX and PositionY are required." });
	}

	try {
		const pixelInfo = await getPixel(positionX, positionY);
		res.json(pixelInfo);
	} catch (err) {
		console.error("Error fetching pixel:", err);
		res.status(404).json({ message: err.message });
	}
});

router.post("/pixel", verifyJWT, async (req, res) => {
	const { positionX, positionY, color } = req.body;

	if (!positionX || !positionY || !color) {
		return res.status(400).json({ message: "PositionX, PositionY, and color are required." });
	}

	const userId = req.userId;

	try {
		const result = await colorPixel(userId, positionX, positionY, color);
		res.json(result);
	} catch (err) {
		console.error("Error coloring pixel:", err);
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
