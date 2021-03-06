const axios = require("axios");

export const getApostas = async (serie, ano, tabela) => {
	const apostas = await getFile(serie, ano);
	const apostasColumns = getColumns(apostas);
	const keys = getKeys(apostasColumns);
	const apostasData = getData(apostas, apostasColumns, keys, tabela);
	return { apostasColumns, apostasData, keys };
};

const getFile = (ano, serie) => {
	return axios
		.get(`${process.env.REACT_APP_API_URL}/getApostas`)
		.then((response) =>
			response.data.apostas.filter(
				(r) => r.serie === serie && r.ano === ano
			)
		)
		.catch((error) => console.log(error));
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

const getData = (apostas, apostasColumns, keys, tabela) => {
	const { equipes, posicoes } = tabela;

	const palpites = apostas.map((a) => a.aposta);
	palpites.unshift(posicoes);
	palpites.unshift(equipes);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

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
