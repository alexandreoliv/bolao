const axios = require("axios");
const API_KEY = process.env.REACT_APP_SECRET_KEY;

export const getSortedTabela = async (serie) => {
	const tabela = await getTabela(serie);
	return sortTabela(tabela);
};

const getTabela = (serie) => {
	// API method:
	if (serie === "A") {
		return axios
			.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
				headers: {
					Authorization: `Bearer ${API_KEY}`,
				},
			})
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function (tabela) {
				return tabela;
			});
	}
	if (serie === "B") {
		return require("../data/tabelaB.json");
	}

	// Local method:
	// if (serie === "A") {
	// 	return require("../data/tabelaA.json");
	// }
	// if (serie === "B") {
	// 	return require("../data/tabelaB.json");
	// }
};

const sortTabela = (tabela) => {
	return tabela
		.map((e) => ({
			nome: e.time.nome_popular,
			posicao: e.posicao,
		}))
		.sort((a, b) => {
			return a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 1;
		});
};
