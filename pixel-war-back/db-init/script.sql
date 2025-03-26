CREATE DATABASE IF NOT EXISTS pixel_war;

USE pixel_war;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    colors JSON NOT NULL,
	jwt_token VARCHAR(512) NULL
);

CREATE TABLE IF NOT EXISTS Pixels (
    color VARCHAR(7) NOT NULL,
    user_id INT NOT NULL,
    position_x INT NOT NULL,
    position_y INT NOT NULL,
	last_painted_at DATETIME NOT NULL,
    PRIMARY KEY (position_x, position_y),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (email, username, password, colors)
SELECT 'user1@example.com', 'user1', '$2b$10$7t7CmWUQWroUb3bjGs.9oeSneiZ8uJpfkPD//vCLD6RgbWoFloa0q', JSON_ARRAY('#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFD700', '#800080', '#FFFFFF', '#000000', '#A52A2A', '#C0C0C0')
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = 'user1@example.com');

INSERT INTO Users (email, username, password, colors)
SELECT 'user2@example.com', 'user2', '$2b$10$7t7CmWUQWroUb3bjGs.9oeSneiZ8uJpfkPD//vCLD6RgbWoFloa0q', JSON_ARRAY('#8A2BE2', '#5F9EA0', '#D2691E', '#FF7F50', '#6495ED', '#DC143C', '#00008B', '#008B8B', '#B8860B', '#A9A9A9')
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = 'user2@example.com');

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#FF5733', 1, 0, 0 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 0 AND position_y = 0);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#33FF57', 1, 99, 0 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 99 AND position_y = 0);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#3357FF', 1, 0, 99 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 0 AND position_y = 99);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#FF33A6', 1, 99, 99 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 99 AND position_y = 99);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#FFD700', 2, 50, 50 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 50 AND position_y = 50);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#800080', 2, 51, 50 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 51 AND position_y = 50);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#FFFFFF', 2, 49, 50 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 49 AND position_y = 50);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#000000', 2, 50, 51 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 50 AND position_y = 51);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#A52A2A', 2, 50, 49 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 50 AND position_y = 499);

INSERT INTO Pixels (color, user_id, position_x, position_y, last_painted_at)
SELECT '#C0C0C0', 2, 51, 51 , NOW() WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 51 AND position_y = 51);