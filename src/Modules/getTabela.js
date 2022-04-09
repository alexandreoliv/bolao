const axios = require("axios");
const API_KEY = process.env.REACT_APP_SECRET_KEY;

export const getTabela = (serie) => {
	// console.info("inside getTabela()");

	const sortedTabela = (tabela) => {
		return tabela
			.map((e) => ({
				nome: e.time.nome_popular,
				posicao: e.posicao,
			}))
			.sort((a, b) => {
				return a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 1;
			});
	};

	// // API method:
	// return axios
	// 	.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
	// 		headers: {
	// 			Authorization: `Bearer ${API_KEY}`,
	// 		},
	// 	})
	// 	.then(function (response) {
	// 		// console.info("Tabela from API: ", response.data);
	// 		return response.data;
	// 	})
	// 	.catch(function (error) {
	// 		console.info(error);
	// 	})
	// 	.then(function (tabela) {
	// 		// always executed
	// 		return sortedTabela(tabela);
	// 	});

	// Local method:
	const tabela = require("../Data/tabela.json");
	// console.info("tabela: ", tabela);
	return sortedTabela(tabela);
};
