const axios = require("axios");
const API_KEY = process.env.REACT_APP_SECRET_KEY;

export const getTabela = (serie) => {
	// console.info("inside getTabela()");
	// Local method:
	const tabela = require("../Data/tabela.json");
	// console.info("tabela: ", tabela);

	const sortedTabela = tabela
		.map((e) => ({
			nome: e.time.nome_popular,
			posicao: e.posicao,
		}))
		.sort((a, b) => {
			return a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 1;
		});
	// console.info("sortedTabela: ", sortedTabela);

	return sortedTabela;

	// // API method:
	// axios
	// 	.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
	// 		headers: {
	// 			Authorization: `Bearer ${API_KEY}`,
	// 		},
	// 	})
	// 	.then(function (response) {
	// 		console.info(response.data);
	// 		return response.data;
	// 	})
	// 	.catch(function (error) {
	// 		// handle error
	// 		console.info(error);
	// 	})
	// 	.then(function () {
	// 		// always executed
	// 	});
};
