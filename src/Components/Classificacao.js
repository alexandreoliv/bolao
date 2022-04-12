import { Table } from "antd";
import { Component } from "react";

export default class Classificacao extends Component {
	render() {
		// console.info("inside Classificacao.js");
		const { serie, classificacaoColumnsA, classificacaoDataA, classificacaoColumnsB, classificacaoDataB } = this.props;
		// console.info(
		// 	"classificacaoDataA inside Classificacao.js: ",
		// 	classificacaoDataA
		// );
		if (typeof classificacaoDataA === "string") return <div></div>;

		return (
			// <div key={classificacaoDataA}>
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
				<Table className="small-table"
					columns={serie === "A" ? classificacaoColumnsA : classificacaoColumnsB}
					dataSource={serie === "A" ? classificacaoDataA : classificacaoDataB}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
