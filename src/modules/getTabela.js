const axios = require("axios");
const API_KEY = process.env.REACT_APP_SECRET_KEY;

export const getTabela = async (serie) => {
	// API method:
	if (serie === "A") {
		// offline way:
		let tabela = require("../data/tabelaA.json");

		// online way:
		// let tabela = await axios
		// 	.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
		// 		headers: {
		// 			Authorization: `Bearer ${API_KEY}`,
		// 		},
		// 	})
		// 	.then((response) => response.data)
		// 	.catch((error) => console.log(error))
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
