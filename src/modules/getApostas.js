export const getApostas = (serie, tabela) => {
	let apostas = getFile(serie);
	const apostasColumns = getColumns(apostas);
	const keys = getKeys(apostasColumns);
	const apostasData = getData(apostas, apostasColumns, keys, tabela);
	return { apostasColumns, apostasData, keys };
};

const getFile = (serie) => {
	if (serie === "A") {
		const aposta = require("../data/apostasA.json");
		return aposta.apostas;
	}
	if (serie === "B") {
		const aposta = require("../data/apostasB.json");
		return aposta.apostas;
	}
};

const getColumns = (apostas) => {
	return apostas.map((a) => ({
		title: a.nome,
		key: a.nome,
		dataIndex: a.nome,
		align: "center",
	}));
};

const getKeys = (apostasColumns) => {
	return (
		apostasColumns
			// .filter((k) => k.title !== "Equipe" && k.title !== "Atual")
			.map((c) => c.title)
	);
};

const getData = (apostas, apostasColumns, keys, tabela) => {
	const equipesArray = apostas
		.filter((a) => a.nome === "Equipe")
		.map((a) => a.aposta)[0];

	const palpites = apostas
		// .filter((a) => a.nome !== "Equipe" && a.nome !== "Atual")
		.map((a) => a.aposta);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

	const apostasData = [];
	for (let j = 0; j < equipesArray.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
			apostasData[j]["Atual"] = tabela[j]["posicao"];
		}
	}

	// sorts the teams according to their standings
	apostasData.sort((a, b) => (a.Atual < b.Atual ? -1 : 1));

	return apostasData;
};
