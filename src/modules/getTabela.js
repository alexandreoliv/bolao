const axios = require("axios");
const API_KEY = process.env.REACT_APP_SECRET_KEY;

export const getTabela = async (serie) => {
	// API method:
	// if (serie === "A") {
	// 	return axios
	// 		.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 			},
	// 		})
	// 		.then(function (response) {
	// 			return response.data;
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		})
	// 		.then(function (tabela) {
	// 			return tabela;
	// 		});
	// }

	if (serie === "A") {
		let tabela = require("../data/tabelaA.json");
		tabela.sort((a, b) =>
			a.time.nome_popular.localeCompare(b.time.nome_popular)
		);
		const equipes = tabela.map((t) => t.time.nome_popular);
		const posicoes = tabela.map((t) => t.posicao);
		tabela = { ano: 2022, serie, equipes, posicoes };
		return tabela;
	}

	return await axios
		.get("http://localhost:5005/getTabelas")
		.then(
			(response) =>
				response.data.tabelas.filter((t) => t.serie === serie)[0]
		)
		.catch((error) => console.log(error));
};
