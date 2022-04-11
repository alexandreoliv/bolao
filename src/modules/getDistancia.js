export const getDistancia = (keys, apostasData) => {
	console.info("inside getDistancia()");

	const distanciaData = [];
	for (let i = 0; i < apostasData.length; i++) {
		distanciaData[i] = JSON.parse(JSON.stringify(apostasData[i]));
		for (let j = 2; j < keys.length; j++) {
			// ignoring "Equipe" and "Atual"
			distanciaData[i][keys[j]] =
				apostasData[i][keys[j]] - apostasData[i].Atual;
		}
	}
	// console.info("distanciaData: ", distanciaData);

	const distanciaColumns = keys.map((k) => ({
		title: k,
		key: k,
		dataIndex: k,
	}));
	// console.info("distanciaColumns: ", distanciaColumns);

	return {
		distanciaColumns,
		distanciaData,
	};
};
