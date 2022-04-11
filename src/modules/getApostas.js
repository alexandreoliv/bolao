import apostasA from "../data/apostasA.json";
import apostasB from "../data/apostasB.json";

export const getApostas = (serie) => {
	// console.info("inside getApostas()");
	if (serie === "A") serie = apostasA;
	else if (serie === "B") serie = apostasB;

	const apostasColumns = serie.apostas.map((a) => ({
		title: a.nome,
		key: a.nome,
		dataIndex: a.nome,
	}));
	// console.info("columns: ", columns);

	const equipesArray = serie.apostas
		.filter((a) => a.nome === "Equipe")
		.map((a) => a.aposta)[0];
	// console.info("equipesArray: ", equipesArray);

	const palpites = serie.apostas.map((a) => a.aposta);
	// console.info("palpites: ", palpites);

	const keys = apostasColumns.map((c) => c.title);
	// console.info("keys: ", keys);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});
	// console.info("obj: ", obj);

	const apostasData = [];
	for (let j = 0; j < equipesArray.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
		}
	}
	// console.info("apostasData: ", apostasData);
	return { apostasColumns, apostasData, keys };
};
