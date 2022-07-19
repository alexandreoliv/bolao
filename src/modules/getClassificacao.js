export const getClassificacao = (keys, apostasData) => {
	const pontuacaoDetalhada = getPontuacaoDetalhada(keys, apostasData);
	console.log("pontuacaoDetalhada", pontuacaoDetalhada);

	const pontuacaoFinal = pontuacaoDetalhada.map((p) => {
		return p.reduce((prev, cur) => prev + cur, 0);
	});

	const filteredKeys = keys.filter((k) => k !== "Equipe" && k !== "Atual");

	const classificacaoData = [];
	console.log("pontuacaoArray", pontuacaoFinal);
	for (let i = 0; i < filteredKeys.length; i++) {
		classificacaoData[i] = {};
		classificacaoData[i]["nome"] = filteredKeys[i];
		classificacaoData[i]["pontuacao"] = pontuacaoFinal[i];
		classificacaoData[i]["key"] = filteredKeys[i];
	}
	console.log("classificacaoData", classificacaoData);

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

const calculaPontuacao = (d) => {
	if (d === 0) return 5;
	if (Math.abs(d) === 1) return 3;
	if (Math.abs(d) === 2) return 1;
	if (Math.abs(d) === 3) return 0;
	if (Math.abs(d) === 4) return -1;
	if (Math.abs(d) === 5) return -3;
	if (Math.abs(d) >= 6) return -5;
};

const geraArray = (k, apostasData) => {
	return apostasData.map((e) => {
		return calculaPontuacao(e[k] - e["Atual"]);
	});
};

const getPontuacaoDetalhada = (keys, apostasData) => {
	return keys
		.filter((k) => k !== "Equipe" && k !== "Atual")
		.map((k) => {
			return geraArray(k, apostasData);
		});
};
