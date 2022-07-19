export const getClassificacao = (serie, keys, apostasData, tabela) => {
	// for (let i = 0; i < apostasData.length; i++) {
	// 	// mutates apostasData
	// 	apostasData[i]["Atual"] = tabela[i]["posicao"];
	// }

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

	apostasData.sort((a, b) => {
		// mutates apostasData
		return a.Atual < b.Atual ? -1 : 1;
	});

	const pontuacaoArray = pontuacaoDetalhadaArray.map((p) => {
		return p.reduce((prev, cur) => prev + cur, 0);
	});

	const keys2 = keys.filter((k) => k !== "Equipe" && k !== "Atual");

	const classificacaoData = [];
	for (let i = 0; i < keys2.length; i++) {
		classificacaoData[i] = {};
		classificacaoData[i]["nome"] = keys2[i];
		classificacaoData[i]["pontuacao"] = pontuacaoArray[i];
		classificacaoData[i]["key"] = keys2[i];
	}

	classificacaoData.sort(function (a, b) {
		// mutates classificacaoData
		return b.pontuacao - a.pontuacao;
	});

	// mutates classificacaoData to add each bettor's current position
	classificacaoData[0].posicao = 1;
	for (let i = 1; i < classificacaoData.length; i++) {
		if (
			classificacaoData[i].pontuacao ===
			classificacaoData[i - 1].pontuacao
		)
			classificacaoData[i].posicao = classificacaoData[i - 1].posicao;
		else classificacaoData[i].posicao = i + 1;
	}

	const classificacaoColumns = [
		{
			title: "Posição",
			key: "posicao",
			dataIndex: "posicao",
			align: "center",
			width: "15%",
		},
		{
			title: "Nome",
			key: "nome",
			dataIndex: "nome",
			align: "center",
			width: "30%",
		},
		{
			title: "Pontuação",
			key: "pontuacao",
			dataIndex: "pontuacao",
			align: "center",
			width: "15%",
		},
	];

	return {
		classificacaoColumns,
		classificacaoData,
	};
};
