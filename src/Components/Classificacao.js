import { Table } from "antd";
import { Component } from "react";
import { getClassificacao } from "../Modules/getClassificacao";

export default class Classificacao extends Component {
	render() {
		const { serie } = this.props;
		const { columnsClassificacao, dataClassificacao } = getClassificacao(serie);
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Classificação Série {serie}
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
