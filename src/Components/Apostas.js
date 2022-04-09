import { Table } from "antd";
import { Component } from "react";
import { getApostas } from "../Modules/getApostas";

export default class Apostas extends Component {
	render() {
		const { serie } = this.props;
		const { columns, data } = getApostas(serie);
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Apostas Série {serie}
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
