const exportApostasAndEquipes = () => {
	const apostasA = fetchAndFilterAposta("apostasA");
	const apostasB = fetchAndFilterAposta("apostasB");
	const equipesA = createEquipes("apostasA", "A");
	const equipesB = createEquipes("apostasB", "B");
	const apostas = concatenateArrays(apostasA, apostasB);
	const equipes = concatenateArrays(equipesA, equipesB);
	exportAsJSON(apostas, "apostas");
	exportAsJSON(equipes, "tabelas");
};

const fetchAndFilterAposta = (name) => {
	const apostas = require(`../data/${name}.json`);
	return apostas.apostas
		.filter((a) => a.nome !== "Equipe" && a.nome !== "Atual")
		.map((a) => ({
			ano: 2022,
			serie: name.slice(-1),
			nome: a.nome,
			aposta: a.aposta,
		}));
};

const createEquipes = (name, serie) => {
	const apostas = require(`../data/${name}.json`);
	return apostas.apostas
		.filter((a) => a.nome === "Equipe")
		.map((e) => ({
			ano: 2022,
			serie,
			equipes: e.aposta,
		}));
};

const concatenateArrays = (array1, array2) => {
	return array1.concat(array2);
};

const exportAsJSON = (array, name) => {
	const fs = require("fs");
	fs.writeFile(`../data/${name}.json`, JSON.stringify(array), function (err) {
		if (err) throw err;
		console.log(`${name}.json complete`);
	});
};

exportApostasAndEquipes();
