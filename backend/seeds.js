const seed = async () => {
	require("dotenv/config");
	const MONGO_URI = process.env.MONGODB_URI;

	const mongoose = require("mongoose");
	mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const Aposta = require("./models/Aposta.model");
	const apostasA = require("../src/data/apostasA.json");
	const apostasB = require("../src/data/apostasB.json");
	const apostas = apostasA.concat(apostasB);
	const Tabela = require("./models/Tabela.model");
	const tabelaB = require("../src/data/tabelaB.json");

	await Aposta.insertMany(apostas)
		.then((a) => {
			console.log(
				`Successfully added ${a.length} aposta(s) into the database`
			);
			// mongoose.connection.close();
		})
		.catch((err) => console.log(err));

	await Tabela.insertMany(tabelaB)
		.then((t) => {
			console.log(
				`Successfully added ${t.length} tabela(s) into the database`
			);
			// mongoose.connection.close();
		})
		.catch((err) => console.log(err));

	mongoose.connection.close();
};

seed();
