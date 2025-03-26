const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const getUserColors = async (userId) => {
	const [rows] = await connection.promise().query(`
	  SELECT colors
	  FROM Users
	  WHERE id = ?
	`, [userId]);

	if (!rows[0]) {
		throw new Error("Utilisateur introuvable.");
	}

	return rows[0].colors;
};

module.exports = {
	getUserColors,
};