import { Table } from "antd";
import { Component } from "react";
import { columns, data } from "../Modules/getData";

export default class Apostas extends Component {
	render() {
		return (
			<div>
				<h2
					style={{
						fontWeight: "bold",
						margin: "0 0 10px 10px",
					}}
				>
					Apostas
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
