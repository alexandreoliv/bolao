import { Table } from "antd";

const Classificacao = (props) => {
	const {
		serie,
		classificacaoColumnsA,
		classificacaoDataA,
		classificacaoColumnsB,
		classificacaoDataB,
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
};

export default Classificacao;
