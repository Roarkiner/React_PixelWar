const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));