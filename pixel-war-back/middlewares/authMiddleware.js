const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyJWT = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ message: "Token is required" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.userId = decoded.userId;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};

module.exports = { verifyJWT };