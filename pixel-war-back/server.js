const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { verifyJWT } = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/protected", verifyJWT, (req, res) => {
	const userId = req.userId;
	res.json({ message: "This is a protected route", userId });
});

app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));