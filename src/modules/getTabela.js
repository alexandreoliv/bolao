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
	// if (serie === "A") {
	// 	return axios
	// 		.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 			},
	// 		})
	// 		.then(function (response) {
	// 			// console.info("Tabela from API: ", response.data);
	// 			return response.data;
	// 		})
	// 		.catch(function (error) {
	// 			console.info(error);
	// 		})
	// 		.then(function (tabela) {
	// 			// always executed
	// 			return sortedTabela(tabela);
	// 		});
	// } else if (serie === "B") {
	// 	const tabela = require("../data/tabelaB.json");
	// 	console.info("tabela Série " + serie + ": ", tabela);
	// 	return sortedTabela(tabela);
	// }

	// Local method:
	if (serie === "A") {
		const tabela = require("../data/tabelaA.json");
		console.info("tabela Série " + serie + ": ", tabela);
		return sortedTabela(tabela);
	} else if (serie === "B") {
		const tabela = require("../data/tabelaB.json");
		console.info("tabela Série " + serie + ": ", tabela);
		return sortedTabela(tabela);
	}
};
