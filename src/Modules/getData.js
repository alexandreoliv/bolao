import apostas from "../Data/apostas.json";
// import equipes from "../Data/equipes.json";
// import rodadas from "../Data/rodadas.json";

const columns = apostas.apostas.map((a) => ({
	title: a.nome,
	key: a.nome,
	dataIndex: a.nome,
}));
console.log("columns: ", columns);

const equipesArray = apostas.apostas
	.filter((a) => a.nome === "Equipe")
	.map((a) => a.aposta)[0];
console.log("equipesArray: ", equipesArray);

const palpites = apostas.apostas.map((a) => a.aposta);
console.log("palpites: ", palpites);

const keys = columns.map((c) => c.title);
console.log("keys: ", keys);

const obj = keys.reduce((accumulator, value) => {
	return { ...accumulator, [value]: "" };
}, {});
console.log("obj: ", obj);

const data = [];
for (let j = 0; j < equipesArray.length; j++) {
	data[j] = JSON.parse(JSON.stringify(obj));
	for (let i = 0; i < columns.length; i++) {
		data[j][keys[i]] = palpites[i][j];
		data[j].key = j;
	}
}
console.log("data: ", data);

export { columns, equipesArray, palpites, keys, obj, data };
