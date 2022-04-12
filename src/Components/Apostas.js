import { Table } from "antd";
import { Component } from "react";

export default class Apostas extends Component {
	render() {
		// console.info("inside Apostas.js");
		// console.info("props inside Apostas.js: ", this.props);
		const {
			serie,
			apostasColumnsA,
			apostasDataA,
			apostasColumnsB,
			apostasDataB,
		} = this.props;
		// console.info("apostasDataA inside Apostas.js: ", apostasDataA);
		// console.info(
		// 	"typeof apostasDataA inside Apostas.js: ",
		// 	typeof apostasDataA
		// );
		if (typeof apostasDataA === "string") return <div></div>;
		// console.info("remained inside Apostas.js");
		// console.info(
		// 	"serie, apostasColumnsA, apostasDataA: ",
		// 	serie,
		// 	", ",
		// 	apostasColumnsA,
		// 	", ",
		// 	apostasDataA
		// );
		return (
			// <div key={apostasDataA}>
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
						textAlign: "center",
					}}
				>
					Apostas Série {serie}
				</h2>
				<Table className="big-table"
					columns={serie === "A" ? apostasColumnsA : apostasColumnsB}
					dataSource={serie === "A" ? apostasDataA : apostasDataB}
					pagination={false}
					size={"small"}
				/>
			</div>
		);
	}
}
