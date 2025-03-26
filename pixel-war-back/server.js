const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { setIoInstance } = require("./services/pixelService");

dotenv.config();

const app = express();

app.use(cors({
	exposedHeaders: ['Authorization'],
	origin: '*'
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		credentials: true
	}
});

setIoInstance(io);

io.on("connection", (socket) => {
	console.log(`Nouvelle connexion, socket ID: ${socket.id}`);
});

server.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));