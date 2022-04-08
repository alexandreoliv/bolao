import { Table } from "antd";
import React, { Component } from "react";
import apostas from "../Data/apostas.json";
import equipes from "../Data/equipes.json";
import rodadas from "../Data/rodadas.json";

const columns = apostas.apostas.map((a) => ({
	title: a.nome,
	key: a.nome,
	dataIndex: a.nome,
}));
//columns.unshift({ title: "Equipe", key: "equipe", dataIndex: "equipe" });
console.log("columns: ", columns);

const equipesArray = equipes.equipes.map((e) => e);
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

export default class Apostas extends Component {
	render() {
		return (
			<div>
				Apostas
				<Table dataSource={data} columns={columns} />
			</div>
		);
	}
}
