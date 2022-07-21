export const getApostas = async (serie, tabela) => {
	let apostas = await getFile(serie);
	console.log("apostas", apostas);
	const apostasColumns = getColumns(apostas);
	const keys = getKeys(apostasColumns);
	const apostasData = getData(apostas, apostasColumns, keys, serie);
	return { apostasColumns, apostasData, keys };
};

// const getFile = (serie) => {
// 	if (serie === "A") {
// 		const aposta = require("../data/apostasA.json");
// 		return aposta.apostas;
// 	}
// 	if (serie === "B") {
// 		const aposta = require("../data/apostasB.json");
// 		return aposta.apostas;
// 	}
// };

const getFile = (serie) => {
	const axios = require("axios");
	return axios
		.get("http://localhost:5005/getApostas")
		.then(function (response) {
			return response.data.apostas.filter((r) => r.serie === serie);
		})
		.catch(function (error) {
			console.log(error);
		});
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

const getData = async (apostas, apostasColumns, keys, serie) => {
	const axios = require("axios");
	const tabela = await axios
		.get("http://localhost:5005/getTabelas")
		.then((response) =>
			response.data.tabelas
				.filter((t) => t.serie === serie)
				.map((t) => ({ equipes: t.equipes, posicoes: t.posicoes }))
		)
		.catch((error) => console.log(error));
	const { equipes, posicoes } = tabela[0];

	console.log("equipes", equipes);
	console.log("posicoes", posicoes);

	const palpites = apostas.map((a) => a.aposta);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

	const apostasData = [];
	for (let j = 0; j < equipes.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
			apostasData[j]["Atual"] = posicoes[j];
		}
	}

	// sorts the teams according to their standings
	apostasData.sort((a, b) => (a.Atual < b.Atual ? -1 : 1));

	return apostasData;
};
