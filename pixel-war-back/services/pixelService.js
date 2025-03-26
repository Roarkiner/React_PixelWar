const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const getGrid = async () => {
	const [pixels] = await connection.promise().query(`
	  SELECT Pixels.position_x, Pixels.position_y, Pixels.color
	  FROM Pixels
	  WHERE Pixels.color IS NOT NULL
	`);
	return pixels.map(pixel => ({
		positionX: pixel.position_x,
		positionY: pixel.position_y,
		color: pixel.color
	}));
};

const getPixel = async (positionX, positionY) => {
	const [pixel] = await connection.promise().query(`
	  SELECT Pixels.color, Pixels.last_painted_at, Users.username
	  FROM Pixels
	  LEFT JOIN Users ON Users.id = Pixels.user_id
	  WHERE Pixels.position_x = ? AND Pixels.position_y = ?
	`, [positionX, positionY]);

	if (!pixel[0] || !pixel[0].color) {
		throw new Error("Pixel introuvable.");
	}

	return {
		positionX,
		positionY,
		color: pixel[0].color,
		last_painted_at: pixel[0].last_painted_at,
		owner: pixel[0].username
	};
};

const colorPixel = async (userId, positionX, positionY, color) => {
	const hexRegex = /^#[0-9A-Fa-f]{6}$/;
	if (!hexRegex.test(color)) {
		throw new Error("La couleur doit être sous la forme '#xxxxxx'");
	}

	const [userRows] = await connection.promise().query(`
	  SELECT id, colors
	  FROM Users
	  WHERE id = ?
	`, [userId]);

	if (!userRows[0]) {
		throw new Error("Utilisateur introuvable.");
	}

	const user = userRows[0];

	const [existingPixel] = await connection.promise().query(`
	  SELECT * FROM Pixels
	  WHERE position_x = ? AND position_y = ?
	`, [positionX, positionY]);

	const now = new Date();

	if (existingPixel.length === 0) {
		await connection.promise().query(`
		INSERT INTO Pixels (position_x, position_y, color, user_id, last_painted_at)
		VALUES (?, ?, ?, ?, ?)
	  `, [positionX, positionY, color, userId, now]);
	} else {
		await connection.promise().query(`
		UPDATE Pixels
		SET color = ?, user_id = ?, last_painted_at = ?
		WHERE position_x = ? AND position_y = ?
	  `, [color, userId, now, positionX, positionY]);
	}

	let colorsArray = [];
	if (user.colors)
		colorsArray = user.colors;

	const index = colorsArray.findIndex(c => c.toLowerCase() === color.toLowerCase());
	if (index !== -1) {
		colorsArray.splice(index, 1);
	}
	colorsArray.unshift(color);
	if (colorsArray.length > 10) {
		colorsArray = colorsArray.slice(0, 10);
	}

	await connection.promise().query(`
  UPDATE Users
  SET colors = ?
  WHERE id = ?
`, [JSON.stringify(colorsArray), userId]);

	return { message: "Pixel colorié avec succès !" };
};

module.exports = {
	getGrid,
	getPixel,
	colorPixel
};
