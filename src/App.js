import "./App.css";
import { Layout, Menu } from "antd";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import Distancia from "./Components/Distancia";
import Regras from "./Components/Regras";
import { getSortedTabela } from "./modules/getTabela";
import { getApostas } from "./modules/getApostas";
import { getClassificacao } from "./modules/getClassificacao";
import { getDistancia } from "./modules/getDistancia";
const { Header, Content, Footer } = Layout;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serie: "A",
			serieA: {
				apostasColumns: "",
				apostasData: "",
				classificacaoColumns: "",
				classificacaoData: "",
				distanciaColumns: "",
				distanciaData: "",
				keys: "",
				tabela: "",
			},
			serieB: {
				apostasColumns: "",
				apostasData: "",
				classificacaoColumns: "",
				classificacaoData: "",
				distanciaColumns: "",
				distanciaData: "",
				keys: "",
				tabela: "",
			},
		};
	}

	handleClick = async (serie) => {
		this.setState({ serie });
	};

	componentDidMount = async () => {
		const tabelaA = await getSortedTabela("A");
		const tabelaB = await getSortedTabela("B");

		let resp = await getApostas("A");
		const apostasColumnsA = resp["apostasColumns"];
		const apostasDataA = resp["apostasData"];
		const keysA = resp["keys"];

		resp = await getApostas("B");
		const apostasColumnsB = resp["apostasColumns"];
		const apostasDataB = resp["apostasData"];
		const keysB = resp["keys"];

		resp = await getClassificacao("A", keysA, apostasDataA, tabelaA);
		const classificacaoColumnsA = resp["classificacaoColumns"];
		const classificacaoDataA = resp["classificacaoData"];

		resp = await getClassificacao("B", keysB, apostasDataB, tabelaB);
		const classificacaoColumnsB = resp["classificacaoColumns"];
		const classificacaoDataB = resp["classificacaoData"];

		resp = await getDistancia(keysA, apostasDataA);
		const distanciaColumnsA = resp["distanciaColumns"];
		const distanciaDataA = resp["distanciaData"];

		resp = await getDistancia(keysB, apostasDataB);
		const distanciaColumnsB = resp["distanciaColumns"];
		const distanciaDataB = resp["distanciaData"];

		this.setState({
			serieA: {
				apostasColumns: apostasColumnsA,
				apostasData: apostasDataA,
				classificacaoColumns: classificacaoColumnsA,
				classificacaoData: classificacaoDataA,
				distanciaColumns: distanciaColumnsA,
				distanciaData: distanciaDataA,
				keys: keysA,
				tabela: tabelaA,
			},
			serieB: {
				apostasColumns: apostasColumnsB,
				apostasData: apostasDataB,
				classificacaoColumns: classificacaoColumnsB,
				classificacaoData: classificacaoDataB,
				distanciaColumns: distanciaColumnsB,
				distanciaData: distanciaDataB,
				keys: keysB,
				tabela: tabelaB,
			},
		});
	};

	render() {
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
							<Menu.Item
								key="1"
								onClick={() => this.handleClick("A")}
							>
								<Link to="/" />
								Apostas A
							</Menu.Item>
							<Menu.Item
								key="2"
								onClick={() => this.handleClick("A")}
							>
								<Link to="/classificacao" />
								Classificação A
							</Menu.Item>
							<Menu.Item
								key="3"
								onClick={() => this.handleClick("A")}
							>
								<Link to="/distancia" />
								Distância A
							</Menu.Item>
							<Menu.Item
								key="4"
								onClick={() => this.handleClick("B")}
							>
								<Link to="/" />
								Apostas B
							</Menu.Item>
							<Menu.Item
								key="5"
								onClick={() => this.handleClick("B")}
							>
								<Link to="/classificacao" />
								Classificação B
							</Menu.Item>
							<Menu.Item
								key="6"
								onClick={() => this.handleClick("B")}
							>
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
											serie={this.state.serie}
											apostasColumnsA={
												this.state.serieA.apostasColumns
											}
											apostasDataA={
												this.state.serieA.apostasData
											}
											apostasColumnsB={
												this.state.serieB.apostasColumns
											}
											apostasDataB={
												this.state.serieB.apostasData
											}
										/>
									}
								/>
								<Route
									exact
									path="/classificacao"
									element={
										<Classificacao
											serie={this.state.serie}
											classificacaoColumnsA={
												this.state.serieA
													.classificacaoColumns
											}
											classificacaoDataA={
												this.state.serieA
													.classificacaoData
											}
											classificacaoColumnsB={
												this.state.serieB
													.classificacaoColumns
											}
											classificacaoDataB={
												this.state.serieB
													.classificacaoData
											}
										/>
									}
								/>
								<Route
									exact
									path="/distancia"
									element={
										<Distancia
											serie={this.state.serie}
											distanciaColumnsA={
												this.state.serieA
													.distanciaColumns
											}
											distanciaDataA={
												this.state.serieA.distanciaData
											}
											distanciaColumnsB={
												this.state.serieB
													.distanciaColumns
											}
											distanciaDataB={
												this.state.serieB.distanciaData
											}
										/>
									}
								/>
								<Route
									exact
									path="/regras"
									element={<Regras />}
								/>
							</Routes>
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}></Footer>
				</Layout>
			</Router>
		);
	}
}
