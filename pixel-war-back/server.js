const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT 'Coucou ça marche de fou' as message");
		res.json(rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});