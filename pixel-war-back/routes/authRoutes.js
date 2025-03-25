const express = require("express");
const { signUp, login } = require("../services/authService");

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const token = await signUp(email, username, password);
		res.json(token);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const token = await login(email, password);
		res.json(token);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;