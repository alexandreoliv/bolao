import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const AddAposta = (props) => {
	console.log("inside AddAposta");
	const { ano, serie, equipes } = props;
	const [posicoes, setPosicoes] = useState([]);
	const [numeros, setNumeros] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		console.log("inside useEffect");
		if (equipes) {
			if (posicoes.length === 0) {
				console.log(
					"useEffet is finally doing some stuff - setting posicoes"
				);
				const state = equipes.map((e) => ({
					equipe: e,
					posicao: 0,
				}));
				setPosicoes(state);
			} else
				console.log(
					"posicoes already has the positions, nothing to do in the useEffect"
				);
		} else console.log("no equipes yet, nothing to do in the useEffect");
	}, [equipes, posicoes.length]);

	const onPosicaoChange = (equipe, posicao) => {
		console.log("inside onPosicaoChange");

		// gets previous position of this team
		const previousPosition = posicoes
			.filter((p) => p.equipe === equipe)
			.map((p) => p.posicao)[0];

		// removes the new position from the array of available positions
		let numerosnew = numeros.filter((n) => n !== posicao);
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosnew.push(previousPosition);
			numerosnew.sort((a, b) => a - b);
		}
		setNumeros(numerosnew);

		// now updates Posicoes
		const posicoesnew = posicoes.map((p) =>
			p.equipe === equipe ? { equipe, posicao } : p
		);
		setPosicoes(posicoesnew);
	};

	const onFinish = (values) => {
		const nome = values["nome"];
		const aposta = equipes.map((e) => values[e]);
		const obj = { ano, serie, nome, aposta };
		const axios = require("axios");
		setDisabled(true);
		return axios
			.post(`${process.env.REACT_APP_API_URL}/sendAposta`, obj)
			.then((response) => {
				console.log({ response });
			})
			.catch((error) => console.log(error));
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	if (!equipes) {
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
							message: "Escreva seu nome",
						},
					]}
				>
					<Input />
				</Form.Item>

				{equipes.map((e) => (
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
							{numeros.map((p) => (
								<Option value={p} key={p}>
									{p}
								</Option>
							))}
						</Select>
					</Form.Item>
				))}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						type="primary"
						htmlType="submit"
						disabled={disabled}
					>
						{disabled ? "Aposta enviada" : "Submit"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAposta;
