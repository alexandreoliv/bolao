import { Table } from "antd";
import { Component } from "react";

export default class Classificacao extends Component {
	render() {
		const {
			serie,
			classificacaoColumnsA,
			classificacaoDataA,
			classificacaoColumnsB,
			classificacaoDataB,
		} = this.props;
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
						textAlign: "center",
					}}
				>
					Classificação Série {serie}
				</h2>
				<Table
					className="small-table"
					columns={
						serie === "A"
							? classificacaoColumnsA
							: classificacaoColumnsB
					}
					dataSource={
						serie === "A" ? classificacaoDataA : classificacaoDataB
					}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
