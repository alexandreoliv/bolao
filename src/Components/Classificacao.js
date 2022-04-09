import { Table } from "antd";
import { Component } from "react";
import { columnsClassificacao, dataClassificacao } from "../Modules/getClassificacao";

export default class Classificacao extends Component {
	render() {
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Classificação
				</h2>
				<Table
					columns={columnsClassificacao}
					dataSource={dataClassificacao}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
