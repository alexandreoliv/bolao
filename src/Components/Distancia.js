import { Table } from "antd";
import { Component } from "react";

export default class Distancia extends Component {
	render() {
		// console.info("inside Distancia.js");
		const { serie, distanciaColumnsA, distanciaDataA, distanciaColumnsB, distanciaDataB } = this.props;

		// console.info(
		// 	"classificacaoDataA inside Classificacao.js: ",
		// 	classificacaoDataA
		// );
		if (typeof distanciaDataA === "string") return <div></div>;

		return (
			// <div key={classificacaoDataA}>
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Distância Para o Acerto Série {serie}
				</h2>
				<Table
					columns={serie === "A" ? distanciaColumnsA : distanciaColumnsB}
					dataSource={serie === "A" ? distanciaDataA : distanciaDataB}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
