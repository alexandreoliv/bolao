import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const AddApostaB = (props) => {
	console.log("inside AddApostaB");
	const { ano, equipesA, equipesB } = props;
	const [posicoesB, setPosicoesB] = useState([]);
	const [numerosB, setNumerosB] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);

	useEffect(() => {
		console.log("inside useEffect");
		if (equipesB) {
			if (posicoesB.length === 0) {
				console.log(
					"useEffet is finally doing some stuff - setting posicoesB"
				);
				const state = equipesB.map((e) => ({
					equipe: e,
					posicao: 0,
				}));
				setPosicoesB(state);
			} else
				console.log(
					"posicoesB already has the positions, nothing to do in the useEffect"
				);
		} else console.log("no equipesB yet, nothing to do in the useEffect");
	}, [equipesB, posicoesB.length]);

	const onPosicaoChange = (equipe, posicao) => {
		console.log("inside onPosicaoChange");

		// gets previous position of this team
		const previousPosition = posicoesB
			.filter((p) => p.equipe === equipe)
			.map((p) => p.posicao)[0];

		// removes the new position from the array of available positions
		let numerosBnew = numerosB.filter((n) => n !== posicao);
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosBnew.push(previousPosition);
			numerosBnew.sort((a, b) => a - b);
		}
		setNumerosB(numerosBnew);

		// now updates PosicoesB
		const posicoesBnew = posicoesB.map((p) =>
			p.equipe === equipe ? { equipe, posicao } : p
		);
		setPosicoesB(posicoesBnew);
	};

	const onFinish = (values) => {
		// console.log("Success:", values);
		const ano = 2022;
		const serie = "B";
		const nome = values["nome"];
		const aposta = equipesB.map((e) => values[e]);
		const obj = { ano, serie, nome, aposta };
		const axios = require("axios");
		return axios
			.post(`${process.env.REACT_APP_API_URL}/sendAposta`, obj)
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	if (!equipesB) {
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

				{equipesB.map((e) => (
					<Form.Item
						name={e}
						label={e}
						key={e}
						// rules={[{ required: true }]}
					>
						<Select
							placeholder="Posição"
							onChange={(event) => onPosicaoChange(e, event)}
							allowClear
						>
							{numerosB.map((p) => (
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

export default AddApostaB;
