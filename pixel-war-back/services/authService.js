const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const generateJWT = (userId) => {
	const payload = { userId };
	const secretKey = process.env.JWT_SECRET_KEY;
	const options = { expiresIn: "1h" };
	return jwt.sign(payload, secretKey, options);
};

const signUp = async (email, username, password) => {
	if (!email || !username || !password) {
		throw new Error("Tous les champs sont requis.");
	}

	const [existingUser] = await connection.promise().query("SELECT * FROM Users WHERE email = ?", [email]);
	if (existingUser.length > 0) {
		throw new Error("Cet email est déjà utilisé.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const now = new Date();
	const colors = JSON.stringify([]);

	const [result] = await connection.promise().query(
		"INSERT INTO Users (email, username, password, colors) VALUES (?, ?, ?, ?)",
		[email, username, hashedPassword, colors]
	);

	const token = generateJWT(result.insertId);
	await connection.promise().query("UPDATE Users SET jwt_token = ? WHERE id = ?", [token, result.insertId]);
	return {
		token,
		user: {
			email,
			username
		}
	};
};

const login = async (email, password) => {
	if (!email || !password) {
		throw new Error("Tous les champs sont requis.");
	}

	const [user] = await connection.promise().query("SELECT * FROM Users WHERE email = ?", [email]);
	if (user.length === 0) {
		throw new Error("Utilisateur non trouvé.");
	}

	const isMatch = await bcrypt.compare(password, user[0].password);
	if (!isMatch) {
		throw new Error("Mot de passe incorrect.");
	}

	const token = generateJWT(user[0].id);
	await connection.promise().query("UPDATE Users SET jwt_token = ? WHERE id = ?", [token, user[0].id]);

	return {
		token,
		user: {
			email: user[0].email,
			username: user[0].username
		}
	};
};

module.exports = { signUp, login };