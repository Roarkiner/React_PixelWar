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
	  SELECT Pixels.color, Users.username
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
		owner: pixel[0].username
	};
};

const colorPixel = async (userId, positionX, positionY, color) => {
	const COLOR_DELAY = 5;

	const [user] = await connection.promise().query(`
	  SELECT can_use_pixel_at
	  FROM Users
	  WHERE id = ?
	`, [userId]);

	if (!user[0]) {
		throw new Error("Utilisateur introuvable.");
	}

	const canUsePixelAt = user[0].can_use_pixel_at;
	const now = new Date();

	if (new Date(canUsePixelAt) > now) {
		const remainingTime = Math.ceil((new Date(canUsePixelAt) - now) / 1000);
		throw new Error(`Vous ne pouvez pas colorier ce pixel pour l'instant. Il vous reste ${remainingTime} secondes.`);
	}

	const [existingPixel] = await connection.promise().query(`
		SELECT * FROM Pixels
		WHERE position_x = ? AND position_y = ?
	  `, [positionX, positionY]);

	if (existingPixel.length === 0) {
		await connection.promise().query(`
		  INSERT INTO Pixels (position_x, position_y, color, user_id)
		  VALUES (?, ?, ?, ?)
		`, [positionX, positionY, color, userId]);
	} else {
		await connection.promise().query(`
		  UPDATE Pixels
		  SET color = ?, user_id = ?
		  WHERE position_x = ? AND position_y = ?
		`, [color, userId, positionX, positionY]);
	}

	const newCanUsePixelAt = new Date(now.getTime() + COLOR_DELAY * 60000);
	await connection.promise().query(`
		UPDATE Users
		SET can_use_pixel_at = ?
		WHERE id = ?
	  `, [newCanUsePixelAt, userId]);

	return { message: "Pixel colorié avec succès !" };
};

module.exports = {
	getGrid,
	getPixel,
	colorPixel
};
