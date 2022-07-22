import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const AddAposta = (props) => {
	console.log("inside AddAposta");
	const { ano, equipesA, equipesB } = props;
	const [posicoesA, setPosicoesA] = useState([]);
	const [numerosA, setNumerosA] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);

	useEffect(() => {
		console.log("inside useEffect");
		if (equipesA) {
			console.log("inside if (equipesA)");
			console.log("equipesA", equipesA);
			console.log("posicoesA", posicoesA);
			if (posicoesA.length === 0) {
				console.log("inside if (posicoesA.length === 0)");
				const state = equipesA.map((e) => ({
					equipe: e,
					posicao: 0,
				}));
				console.log("state", state);
				setPosicoesA(state);
			}
		}
	});

	const onPosicaoChange = (equipe, posicao) => {
		console.log("inside onPosicaoChange");

		// gets previous position of this team
		const previousPosition = posicoesA
			.filter((p) => p.equipe === equipe)
			.map((p) => p.posicao)[0];

		// removes the new position from the array of available positions
		let numerosAnew = numerosA.filter((n) => n !== posicao);
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosAnew.push(previousPosition);
			numerosAnew.sort((a, b) => a - b);
		}
		setNumerosA(numerosAnew);

		// now updates PosicoesA
		let posicoesAnew = [...posicoesA];
		posicoesAnew = posicoesAnew.map((p) =>
			p.equipe === equipe ? { equipe, posicao } : p
		);
		setPosicoesA(posicoesAnew);
	};

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	if (!equipesA) {
		console.log("no props yet, will return null");
		return null; // no props yet
	}

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Adicionar Aposta
			</h2>
			<Form
				name="basic"
				labelCol={{ span: 2 }}
				wrapperCol={{ span: 3 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Nome"
					name="nome"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>

				{equipesA.map((e) => (
					<Form.Item
						name={e}
						label={e}
						key={e}
						rules={[{ required: true }]}
					>
						<Select
							placeholder="Posição"
							onChange={(event) => onPosicaoChange(e, event)}
							allowClear
						>
							{numerosA.map((p) => (
								<Option value={p} key={p}>
									{p}
								</Option>
							))}
						</Select>
					</Form.Item>
				))}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAposta;
