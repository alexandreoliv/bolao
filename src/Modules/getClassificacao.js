import { getApostas } from "../Modules/getApostas";
// import { getTabela } from "../Modules/getTabela";

export const getClassificacao = (serie) => {
	const { keys, data } = getApostas(serie);

	const calculaPontuacao = (d) => {
		if (d === 0) return 5;
		if (Math.abs(d) === 1) return 3;
		if (Math.abs(d) === 2) return 1;
		if (Math.abs(d) === 3) return 0;
		if (Math.abs(d) === 4) return -1;
		if (Math.abs(d) === 5) return -3;
		if (Math.abs(d) >= 6) return -5;
	};

	const geraArray = (k) => {
		return data.map((e) => {
			return calculaPontuacao(e[k] - e["Atual"]);
		});
	};

	const pontuacaoDetalhadaArray = keys
		.filter((k) => k !== "Equipe" && k !== "Atual")
		.map((k) => {
			return geraArray(k);
		});
	// console.info("pontuacaoDetalhadaArray", pontuacaoDetalhadaArray);

	const pontuacaoArray = pontuacaoDetalhadaArray.map((p) => {
		return p.reduce((prev, cur) => prev + cur, 0);
	});
	// console.info("pontuacaoArray", pontuacaoArray);

	const keys2 = keys.filter((k) => k !== "Equipe" && k !== "Atual");
	// console.info("keys2", keys2);

	const obj2 = keys2.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});
	// console.info("obj2: ", obj2);

	const dataClassificacao = [];
	for (let i = 0; i < keys2.length; i++) {
		dataClassificacao[i] = {};
		dataClassificacao[i]["nome"] = keys2[i];
		dataClassificacao[i]["pontuacao"] = pontuacaoArray[i];
		dataClassificacao[i]["key"] = keys2[i];
	}
	// console.info("dataClassificacao: ", dataClassificacao);

	dataClassificacao.sort(function (a, b) {
		return b.pontuacao - a.pontuacao;
	});

	const columnsClassificacao = [
		{
			title: "Nome",
			key: "nome",
			dataIndex: "nome",
		},
		{
			title: "Pontuação",
			key: "pontuacao",
			dataIndex: "pontuacao",
		},
	];
	// console.info("columnsClassificacao: ", columnsClassificacao);

	return {
		pontuacaoDetalhadaArray,
		keys2,
		obj2,
		dataClassificacao,
		columnsClassificacao,
	};

	// export {
	// 	calculaPontuacao,
	// 	pontuacaoDetalhadaArray,
	// 	keys2,
	// 	obj2,
	// 	dataClassificacao,
	// 	columnsClassificacao,
	// };
};
