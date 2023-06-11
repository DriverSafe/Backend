const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const locationRoutes = require("./routes/locations");

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use("/locations", locationRoutes);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

mongoose.connect(config.get("db.mongoUri")).then(() => {
	console.log("Connected to MongoDB");
});

const router = app.listen(config.get("app.port"), () =>
	console.log(`App has been started on port ${config.get("app.port")}...`)
);

module.exports = router;
