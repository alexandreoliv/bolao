import apostasA from "../Data/apostasA.json";
import apostasB from "../Data/apostasB.json";

export const getApostas = (serie) => {
	if (serie === "A") serie = apostasA;
	else if (serie === "B") serie = apostasB;

	const columns = serie.apostas.map((a) => ({
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

	const keys = columns.map((c) => c.title);
	// console.info("keys: ", keys);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});
	// console.info("obj: ", obj);

	const data = [];
	for (let j = 0; j < equipesArray.length; j++) {
		data[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < columns.length; i++) {
			data[j][keys[i]] = palpites[i][j];
			data[j].key = j;
		}
	}
	// console.info("data: ", data);
	//export { columns, equipesArray, palpites, keys, obj, data };
	return { columns, equipesArray, palpites, keys, obj, data };
};
