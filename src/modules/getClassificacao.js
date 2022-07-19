export const getClassificacao = (keys, apostasData) => {
	const pontuacaoDetalhada = getPontuacaoDetalhada(keys, apostasData);
	const pontuacaoFinal = getPontuacaoFinal(pontuacaoDetalhada);
	const filteredKeys = keys.filter((k) => k !== "Equipe" && k !== "Atual");
	const classificacaoData = getClassificacaoData(
		filteredKeys,
		pontuacaoFinal
	);
	const classificacaoColumns = getClassificacaoColumns();

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

const getPontuacaoFinal = (pontuacaoDetalhada) => {
	return pontuacaoDetalhada.map((p) =>
		p.reduce((prev, cur) => prev + cur, 0)
	);
};

const getClassificacaoData = (filteredKeys, pontuacaoFinal) => {
	let classificacaoData = [];
	for (let i = 0; i < filteredKeys.length; i++) {
		classificacaoData[i] = {};
		classificacaoData[i]["nome"] = filteredKeys[i];
		classificacaoData[i]["pontuacao"] = pontuacaoFinal[i];
		classificacaoData[i]["key"] = filteredKeys[i];
	}
	classificacaoData.sort(function (a, b) {
		// mutates classificacaoData
		return b.pontuacao - a.pontuacao;
	});

	classificacaoData = addPosicaoApostador(classificacaoData);
	return classificacaoData;
};

const addPosicaoApostador = (classificacaoData) => {
	let classificacaoDataClone = JSON.parse(JSON.stringify(classificacaoData));
	classificacaoDataClone[0].posicao = 1;
	for (let i = 1; i < classificacaoDataClone.length; i++) {
		if (
			classificacaoDataClone[i].pontuacao ===
			classificacaoDataClone[i - 1].pontuacao
		)
			classificacaoDataClone[i].posicao =
				classificacaoDataClone[i - 1].posicao;
		else classificacaoDataClone[i].posicao = i + 1;
	}
	return classificacaoDataClone;
};

const getClassificacaoColumns = () => {
	return [
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
};
