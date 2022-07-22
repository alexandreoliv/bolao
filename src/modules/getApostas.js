export const getApostas = async (serie) => {
	let apostas = await getFile(serie);
	const apostasColumns = getColumns(apostas);
	console.log("apostasColumns", apostasColumns);
	const keys = getKeys(apostasColumns);
	console.log("keys", keys);
	const apostasData = await getData(apostas, apostasColumns, keys, serie);
	console.log("apostasData", apostasData);
	return { apostasColumns, apostasData, keys };
};

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
	let columns = apostas.map((a) => ({
		title: a.nome,
		key: a.nome,
		dataIndex: a.nome,
		align: "center",
	}));
	columns.unshift({
		title: "Atual",
		key: "Atual",
		dataIndex: "Atual",
		align: "center",
	});
	columns.unshift({
		title: "Equipe",
		key: "Equipe",
		dataIndex: "Equipe",
		align: "center",
	});
	return columns;
};

const getKeys = (apostasColumns) => {
	return apostasColumns.map((c) => c.title);
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
	palpites.unshift(posicoes);
	palpites.unshift(equipes);
	console.log("palpites", palpites);
	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});
	console.log("obj", obj);

	const apostasData = [];
	for (let j = 0; j < equipes.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
		}
	}

	// sorts the teams according to their standings
	apostasData.sort((a, b) => (a.Atual < b.Atual ? -1 : 1));

	return apostasData;
};
