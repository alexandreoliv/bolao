import { Table } from "antd";

const Distancia = (props) => {
	const {
		serie,
		distanciaColumnsA,
		distanciaDataA,
		distanciaColumnsB,
		distanciaDataB,
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
				Distância Para o Acerto Série {serie}
			</h2>
			<Table
				className="big-table"
				columns={serie === "A" ? distanciaColumnsA : distanciaColumnsB}
				dataSource={serie === "A" ? distanciaDataA : distanciaDataB}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Distancia;
