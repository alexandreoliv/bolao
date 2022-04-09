export const getClassificacao = (serie, keys, apostasData, tabela) => {
	// console.info("inside getClassificacao()");
	// console.info("apostasData: ", apostasData);

	for (let i = 0; i < apostasData.length; i++) {
		apostasData[i]["Atual"] = tabela[i].posicao;
	}
	// console.info("new apostasData is here!: ", apostasData);

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
		return apostasData.map((e) => {
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

	const classificacaoData = [];
	for (let i = 0; i < keys2.length; i++) {
		classificacaoData[i] = {};
		classificacaoData[i]["nome"] = keys2[i];
		classificacaoData[i]["pontuacao"] = pontuacaoArray[i];
		classificacaoData[i]["key"] = keys2[i];
	}
	// console.info("classificacaoData: ", classificacaoData);

	classificacaoData.sort(function (a, b) {
		return b.pontuacao - a.pontuacao;
	});

	const classificacaoColumns = [
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
	// console.info("classificacaoColumns: ", classificacaoColumns);

	return {
		classificacaoColumns,
		classificacaoData,
	};
};
