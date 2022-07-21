const seed = async () => {
	require("dotenv/config");
	const MONGO_URI = process.env.MONGODB_URI;

	const mongoose = require("mongoose");
	mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const Aposta = require("./models/Aposta.model");
	const apostas = require("../src/data/apostas.json");
	const Tabela = require("./models/Tabela.model");
	const tabelas = require("../src/data/tabelas.json");

	await Aposta.insertMany(apostas)
		.then((a) => {
			console.log(
				`Successfully added ${a.length} apostas into the database`
			);
			// mongoose.connection.close();
		})
		.catch((err) => console.log(err));

	await Tabela.insertMany(tabelas)
		.then((t) => {
			console.log(
				`Successfully added ${t.length} tabelas into the database`
			);
			// mongoose.connection.close();
		})
		.catch((err) => console.log(err));

	mongoose.connection.close();
};

seed();
