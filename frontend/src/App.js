import "./App.css";
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import Distancia from "./Components/Distancia";
import Regras from "./Components/Regras";
import AddAposta from "./Components/AddAposta";
import { getData } from "./modules/getData";
const { Header, Content, Footer } = Layout;

export const App = () => {
	const [anoAndSerie, setAnoAndSerie] = useState({ ano: 2023, serie: "A" });
	const [dados, setDados] = useState("");

	useEffect(() => {
		if (!dados) {
			getAllData();
		}
	});

	const getAllData = async () => {
		let dados = [];
		dados.push(await getData(2020, "A"));
		dados.push(await getData(2021, "A"));
		dados.push(await getData(2021, "B"));
		dados.push(await getData(2022, "A"));
		dados.push(await getData(2022, "B"));
		dados.push(await getData(2023, "A"));
		dados.push(await getData(2023, "B"));
		setDados(dados);
	};

	console.log("dados now", dados);

	if (!dados) return;

	return (
		<Router>
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["22"]}
					>
						<Menu.Item
							key="22"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "A" })
							}
						>
							<Link to="/addAposta" />
							Adicionar Aposta A
						</Menu.Item>
						<Menu.Item
							key="23"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "B" })
							}
						>
							<Link to="/addAposta" />
							Adicionar Aposta B
						</Menu.Item>

						{/* <Menu.Item
							key="1"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "A" })
							}
						>
							<Link to="/" />
							AA23
						</Menu.Item>
						<Menu.Item
							key="2"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "A" })
							}
						>
							<Link to="/classificacao" />
							CA23
						</Menu.Item>
						<Menu.Item
							key="3"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "A" })
							}
						>
							<Link to="/distancia" />
							DA23
						</Menu.Item>
						<Menu.Item
							key="4"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "B" })
							}
						>
							<Link to="/" />
							AB23
						</Menu.Item>
						<Menu.Item
							key="5"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "B" })
							}
						>
							<Link to="/classificacao" />
							CB23
						</Menu.Item>
						<Menu.Item
							key="6"
							onClick={() =>
								setAnoAndSerie({ ano: 2023, serie: "B" })
							}
						>
							<Link to="/distancia" />
							DB23
						</Menu.Item>

						<Menu.Item
							key="7"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "A" })
							}
						>
							<Link to="/" />
							AA22
						</Menu.Item>
						<Menu.Item
							key="8"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "A" })
							}
						>
							<Link to="/classificacao" />
							CA22
						</Menu.Item>
						<Menu.Item
							key="9"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "A" })
							}
						>
							<Link to="/distancia" />
							DA22
						</Menu.Item>
						<Menu.Item
							key="10"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "B" })
							}
						>
							<Link to="/" />
							AB22
						</Menu.Item>
						<Menu.Item
							key="11"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "B" })
							}
						>
							<Link to="/classificacao" />
							CB22
						</Menu.Item>
						<Menu.Item
							key="12"
							onClick={() =>
								setAnoAndSerie({ ano: 2022, serie: "B" })
							}
						>
							<Link to="/distancia" />
							DB22
						</Menu.Item>

						<Menu.Item
							key="13"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "A" })
							}
						>
							<Link to="/" />
							AA21
						</Menu.Item>
						<Menu.Item
							key="14"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "A" })
							}
						>
							<Link to="/classificacao" />
							CA21
						</Menu.Item>
						<Menu.Item
							key="15"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "A" })
							}
						>
							<Link to="/distancia" />
							DA21
						</Menu.Item>
						<Menu.Item
							key="16"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "B" })
							}
						>
							<Link to="/" />
							AB21
						</Menu.Item>
						<Menu.Item
							key="17"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "B" })
							}
						>
							<Link to="/classificacao" />
							CB21
						</Menu.Item>
						<Menu.Item
							key="18"
							onClick={() =>
								setAnoAndSerie({ ano: 2021, serie: "B" })
							}
						>
							<Link to="/distancia" />
							DB21
						</Menu.Item>
						<Menu.Item
							key="19"
							onClick={() =>
								setAnoAndSerie({ ano: 2020, serie: "A" })
							}
						>
							<Link to="/" />
							AA20
						</Menu.Item>
						<Menu.Item
							key="20"
							onClick={() =>
								setAnoAndSerie({ ano: 2020, serie: "A" })
							}
						>
							<Link to="/classificacao" />
							CA20
						</Menu.Item>
						<Menu.Item
							key="21"
							onClick={() =>
								setAnoAndSerie({ ano: 2020, serie: "A" })
							}
						>
							<Link to="/distancia" />
							DA20
						</Menu.Item>

						<Menu.Item key="24">
							<Link to="/regras" />
							Regras
						</Menu.Item> */}
					</Menu>
				</Header>
				<Content style={{ padding: "0 50px" }}>
					<h1
						style={{
							textAlign: "center",
							fontWeight: "bold",
							margin: "10px 0",
						}}
					>
						Bolão Brasileiro
					</h1>
					<div
						className="site-layout-content"
						style={{ padding: "10px 0 0 0 " }}
					>
						<Routes>
							<Route
								path="/"
								element={
									// <Apostas
									// 	ano={anoAndSerie.ano}
									// 	serie={anoAndSerie.serie}
									// 	apostasColumns={
									// 		dados
									// 			.filter(
									// 				(d) =>
									// 					d.ano ===
									// 						anoAndSerie.ano &&
									// 					d.serie ===
									// 						anoAndSerie.serie
									// 			)
									// 			.map((d) => d.apostasColumns)[0]
									// 	}
									// 	apostasData={
									// 		dados
									// 			.filter(
									// 				(d) =>
									// 					d.ano ===
									// 						anoAndSerie.ano &&
									// 					d.serie ===
									// 						anoAndSerie.serie
									// 			)
									// 			.map((d) => d.apostasData)[0]
									// 	}
									// />
									<AddAposta
										ano={anoAndSerie.ano}
										serie={anoAndSerie.serie}
										equipes={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map((d) => d.tabela.equipes)[0]
										}
									/>
								}
							/>
							<Route
								exact
								path="/classificacao"
								element={
									<Classificacao
										ano={anoAndSerie.ano}
										serie={anoAndSerie.serie}
										classificacaoColumns={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map(
													(d) =>
														d.classificacaoColumns
												)[0]
										}
										classificacaoData={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map(
													(d) => d.classificacaoData
												)[0]
										}
									/>
								}
							/>
							<Route
								exact
								path="/distancia"
								element={
									<Distancia
										ano={anoAndSerie.ano}
										serie={anoAndSerie.serie}
										distanciaColumns={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map(
													(d) => d.distanciaColumns
												)[0]
										}
										distanciaData={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map((d) => d.distanciaData)[0]
										}
									/>
								}
							/>
							<Route
								exact
								path="/addAposta"
								element={
									<AddAposta
										ano={anoAndSerie.ano}
										serie={anoAndSerie.serie}
										equipes={
											dados
												.filter(
													(d) =>
														d.ano ===
															anoAndSerie.ano &&
														d.serie ===
															anoAndSerie.serie
												)
												.map((d) => d.tabela.equipes)[0]
										}
									/>
								}
							/>
							<Route exact path="/regras" element={<Regras />} />
						</Routes>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}></Footer>
			</Layout>
		</Router>
	);
};
