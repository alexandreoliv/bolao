import { Table } from "antd";
import { Component } from "react";

const data = [
	{
		key: "1",
		situacao: "Acerto",
		pontos: 5,
	},
	{
		key: "2",
		situacao: "Errar por 1",
		pontos: 3,
	},
	{
		key: "3",
		situacao: "Errar por 2",
		pontos: 1,
	},
	{
		key: "4",
		situacao: "Errar por 3",
		pontos: 0,
	},
	{
		key: "5",
		situacao: "Errar por 4",
		pontos: -1,
	},
	{
		key: "6",
		situacao: "Errar por 5",
		pontos: -3,
	},
	{
		key: "7",
		situacao: "Errar por 6 ou mais",
		pontos: -5,
	},
];

const columns = [
	{
		title: "Situação",
		dataIndex: "situacao",
		key: "situacao",
	},
	{
		title: "Pontos",
		dataIndex: "pontos",
		key: "pontos",
	},
];

export default class Regras extends Component {
	render() {
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Regras
				</h2>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
