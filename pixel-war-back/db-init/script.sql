CREATE DATABASE IF NOT EXISTS pixel_war;

USE pixel_war;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    can_use_pixel_at DATETIME NOT NULL,
    colors JSON NOT NULL,
	jwt_token VARCHAR(512) NULL
);

CREATE TABLE IF NOT EXISTS Pixels (
    color VARCHAR(7) NOT NULL,
    user_id INT NOT NULL,
    position_x INT NOT NULL,
    position_y INT NOT NULL,
    PRIMARY KEY (position_x, position_y),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (email, username, password, can_use_pixel_at, colors)
SELECT 'user1@example.com', 'user1', '$2b$10$7t7CmWUQWroUb3bjGs.9oeSneiZ8uJpfkPD//vCLD6RgbWoFloa0q', NOW(), JSON_ARRAY('#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFD700', '#800080', '#FFFFFF', '#000000', '#A52A2A', '#C0C0C0')
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = 'user1@example.com');

INSERT INTO Users (email, username, password, can_use_pixel_at, colors)
SELECT 'user2@example.com', 'user2', '$2b$10$7t7CmWUQWroUb3bjGs.9oeSneiZ8uJpfkPD//vCLD6RgbWoFloa0q', NOW(), JSON_ARRAY('#8A2BE2', '#5F9EA0', '#D2691E', '#FF7F50', '#6495ED', '#DC143C', '#00008B', '#008B8B', '#B8860B', '#A9A9A9')
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = 'user2@example.com');

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#FF5733', 1, 0, 0 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 0 AND position_y = 0);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#33FF57', 1, 1000, 0 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 1000 AND position_y = 0);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#3357FF', 1, 0, 1000 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 0 AND position_y = 1000);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#FF33A6', 1, 1000, 1000 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 1000 AND position_y = 1000);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#FFD700', 2, 500, 500 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 500 AND position_y = 500);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#800080', 2, 501, 500 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 501 AND position_y = 500);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#FFFFFF', 2, 499, 500 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 499 AND position_y = 500);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#000000', 2, 500, 501 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 500 AND position_y = 501);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#A52A2A', 2, 500, 499 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 500 AND position_y = 499);

INSERT INTO Pixels (color, user_id, position_x, position_y)
SELECT '#C0C0C0', 2, 501, 501 WHERE NOT EXISTS (SELECT 1 FROM Pixels WHERE position_x = 501 AND position_y = 501);