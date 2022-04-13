import apostasA from "../data/apostasA.json";
import apostasB from "../data/apostasB.json";

export const getApostas = (serie) => {
	if (serie === "A") serie = apostasA;
	else if (serie === "B") serie = apostasB;

	const apostasColumns = serie.apostas.map((a) => ({
		title: a.nome,
		key: a.nome,
		dataIndex: a.nome,
		align: "center",
	}));

	const equipesArray = serie.apostas
		.filter((a) => a.nome === "Equipe")
		.map((a) => a.aposta)[0];

	const palpites = serie.apostas.map((a) => a.aposta);

	const keys = apostasColumns.map((c) => c.title);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

	const apostasData = [];
	for (let j = 0; j < equipesArray.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
		}
	}
	return { apostasColumns, apostasData, keys };
};
