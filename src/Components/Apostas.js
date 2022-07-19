import { Table } from "antd";

const Apostas = (props) => {
	const {
		serie,
		apostasColumnsA,
		apostasDataA,
		apostasColumnsB,
		apostasDataB,
	} = props;

	return (
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
			<Table
				className="big-table"
				columns={serie === "A" ? apostasColumnsA : apostasColumnsB}
				dataSource={serie === "A" ? apostasDataA : apostasDataB}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Apostas;
