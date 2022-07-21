require("dotenv/config");
require("./db");
const Aposta = require("./models/Aposta.model");
const Tabela = require("./models/Tabela.model");

const express = require("express");
const app = express();

require("./config")(app);
const session = require("express-session");
const MongoStore = require("connect-mongo");
const DB_URL = process.env.MONGODB_URI;

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		saveUninitialized: false,
		resave: true,
		store: MongoStore.create({
			mongoUrl: DB_URL,
		}),
	})
);

app.get("/", (req, res) => {
	res.send("hello world");
});

app.get("/getApostas", (req, res) => {
	console.log("----->>> GET /getApostas called: ");
	Aposta.find()
		.then((apostas) => res.json({ apostas }))
		.catch((err) => console.log(err));
});

app.get("/getTabelas", (req, res) => {
	console.log("----->>> GET /getTabelas called: ");
	Tabela.find()
		.then((tabelas) => res.json({ tabelas }))
		.catch((err) => console.log(err));
});

module.exports = app;
