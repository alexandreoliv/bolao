import "./App.css";
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import Distancia from "./Components/Distancia";
import Regras from "./Components/Regras";
import { getSortedTabela } from "./modules/getSortedTabela";
import { getApostas } from "./modules/getApostas";
import { getClassificacao } from "./modules/getClassificacao";
import { getDistancia } from "./modules/getDistancia";
const { Header, Content, Footer } = Layout;

export const App = () => {
	const [serie, setSerie] = useState("A");
	const [serieA, setSerieA] = useState({
		apostasColumns: "",
		apostasData: "",
		classificacaoColumns: "",
		classificacaoData: "",
		distanciaColumns: "",
		distanciaData: "",
		keys: "",
		tabela: "",
	});
	const [serieB, setSerieB] = useState({
		apostasColumns: "",
		apostasData: "",
		classificacaoColumns: "",
		classificacaoData: "",
		distanciaColumns: "",
		distanciaData: "",
		keys: "",
		tabela: "",
	});

	useEffect(() => {
		if (!serieA.tabela) {
			getData();
		}
	});

	const getData = async () => {
		const tabelaA = await getSortedTabela("A");
		const tabelaB = await getSortedTabela("B");

		const {
			apostasColumns: apostasColumnsA,
			apostasData: apostasDataA,
			keys: keysA,
		} = await getApostas("A");

		const {
			apostasColumns: apostasColumnsB,
			apostasData: apostasDataB,
			keys: keysB,
		} = await getApostas("B");

		const {
			classificacaoColumns: classificacaoColumnsA,
			classificacaoData: classificacaoDataA,
		} = getClassificacao(keysA, apostasDataA);

		const {
			classificacaoColumns: classificacaoColumnsB,
			classificacaoData: classificacaoDataB,
		} = getClassificacao(keysB, apostasDataB);

		const {
			distanciaColumns: distanciaColumnsA,
			distanciaData: distanciaDataA,
		} = getDistancia(keysA, apostasDataA);

		const {
			distanciaColumns: distanciaColumnsB,
			distanciaData: distanciaDataB,
		} = getDistancia(keysB, apostasDataB);

		setSerieA({
			apostasColumns: apostasColumnsA,
			apostasData: apostasDataA,
			classificacaoColumns: classificacaoColumnsA,
			classificacaoData: classificacaoDataA,
			distanciaColumns: distanciaColumnsA,
			distanciaData: distanciaDataA,
			keys: keysA,
			tabela: tabelaA,
		});

		setSerieB({
			apostasColumns: apostasColumnsB,
			apostasData: apostasDataB,
			classificacaoColumns: classificacaoColumnsB,
			classificacaoData: classificacaoDataB,
			distanciaColumns: distanciaColumnsB,
			distanciaData: distanciaDataB,
			keys: keysB,
			tabela: tabelaB,
		});
	};

	return (
		<Router>
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
					>
						<Menu.Item key="1" onClick={() => setSerie("A")}>
							<Link to="/" />
							Apostas A
						</Menu.Item>
						<Menu.Item key="2" onClick={() => setSerie("A")}>
							<Link to="/classificacao" />
							Classificação A
						</Menu.Item>
						<Menu.Item key="3" onClick={() => setSerie("A")}>
							<Link to="/distancia" />
							Distância A
						</Menu.Item>
						<Menu.Item key="4" onClick={() => setSerie("B")}>
							<Link to="/" />
							Apostas B
						</Menu.Item>
						<Menu.Item key="5" onClick={() => setSerie("B")}>
							<Link to="/classificacao" />
							Classificação B
						</Menu.Item>
						<Menu.Item key="6" onClick={() => setSerie("B")}>
							<Link to="/distancia" />
							Distância B
						</Menu.Item>
						<Menu.Item key="7">
							<Link to="/regras" />
							Regras
						</Menu.Item>
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
						Bolão Brasileiro 2022
					</h1>
					<div
						className="site-layout-content"
						style={{ padding: "10px 0 0 0 " }}
					>
						<Routes>
							<Route
								path="/"
								element={
									<Apostas
										serie={serie}
										apostasColumnsA={serieA.apostasColumns}
										apostasDataA={serieA.apostasData}
										apostasColumnsB={serieB.apostasColumns}
										apostasDataB={serieB.apostasData}
									/>
								}
							/>
							<Route
								exact
								path="/classificacao"
								element={
									<Classificacao
										serie={serie}
										classificacaoColumnsA={
											serieA.classificacaoColumns
										}
										classificacaoDataA={
											serieA.classificacaoData
										}
										classificacaoColumnsB={
											serieB.classificacaoColumns
										}
										classificacaoDataB={
											serieB.classificacaoData
										}
									/>
								}
							/>
							<Route
								exact
								path="/distancia"
								element={
									<Distancia
										serie={serie}
										distanciaColumnsA={
											serieA.distanciaColumns
										}
										distanciaDataA={serieA.distanciaData}
										distanciaColumnsB={
											serieB.distanciaColumns
										}
										distanciaDataB={serieB.distanciaData}
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
