const exportApostasAndEquipes = () => {
	const apostasA = getApostas("apostasA");
	const apostasB = getApostas("apostasB");
	const tabelaA = getTabela("apostasA", "tabelaA", "A");
	const tabelaB = getTabela("apostasB", "tabelaB", "B");
	const apostas = concatenateArrays(apostasA, apostasB);
	const tabelas = concatenateArrays(tabelaA, tabelaB);
	exportAsJSON(apostas, "apostas");
	exportAsJSON(tabelas, "tabelas");
};

const getApostas = (name) => {
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

const getTabela = (nameApostas, nameTabela, serie) => {
	const posicoes = getPosicoes(nameTabela);
	const equipes = getEquipes(nameApostas, serie);
	const tabela = equipes.map((e) => ({
		ano: 2022,
		serie,
		equipes: e.equipes,
		posicoes: posicoes,
	}));
	return tabela;
};

const getPosicoes = (nameTabela) => {
	let tabela = require(`../data/${nameTabela}.json`);

	// sorts the teams alphabetically
	tabela.sort((a, b) =>
		a.time.nome_popular.localeCompare(b.time.nome_popular)
	);

	const posicoes = tabela.map((t) => t.posicao);
	return posicoes;
};

const getEquipes = (name) => {
	const apostas = require(`../data/${name}.json`);
	let equipes = apostas.apostas
		.filter((a) => a.nome === "Equipe")
		.map((e) => ({
			equipes: e.aposta,
		}));
	return equipes;
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
