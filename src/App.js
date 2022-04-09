import "./App.css";
import { Layout, Menu } from "antd";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import { getTabela } from "./Modules/getTabela";
import { getApostas } from "./Modules/getApostas";
import { getClassificacao } from "./Modules/getClassificacao";
const { Header, Content, Footer } = Layout;

export default class App extends Component {
	constructor(props) {
		// console.info("inside App.js constructor()");
		super(props);
		this.state = {
			serie: "A",
			serieA: {
				apostasColumns: "",
				apostasData: "",
				classificacaoColumns: "",
				classificacaoData: "",
				keys: "",
				tabela: "",
			},
			serieB: {
				apostasColumns: "",
				apostasData: "",
				classificacaoColumns: "",
				classificacaoData: "",
				keys: "",
				tabela: "",
			},
		};
	}

	handleClick = async (serie) => {
		this.setState({ serie });
	};

	componentDidMount = async () => {
		// console.info("inside App.js componentDidMount()");
		const tabelaA = await getTabela("A");
		// console.info("inside componentDidMount() tabelaA", tabelaA);
		const tabelaB = await getTabela("B");
		// console.info("inside componentDidMount() tabelaB", tabelaB);

		// const { apostasColumnsA, apostasDataA, keysA } = await getApostas("A");
		let resp = await getApostas("A");
		// console.info("inside componentDidMount() resp", resp);
		const apostasColumnsA = resp["apostasColumns"];
		const apostasDataA = resp["apostasData"];
		const keysA = resp["keys"];

		// console.info(
		// 	"inside componentDidMount() apostasColumnsA",
		// 	apostasColumnsA
		// );
		// console.info("inside componentDidMount() apostasDataA", apostasDataA);
		// console.info("inside componentDidMount() keysA", keysA);

		resp = await getApostas("B");
		// console.info("inside componentDidMount() resp", resp);
		const apostasColumnsB = resp["apostasColumns"];
		const apostasDataB = resp["apostasData"];
		const keysB = resp["keys"];

		// console.info(
		// 	"inside componentDidMount() apostasColumnsB",
		// 	apostasColumnsB
		// );
		// console.info("inside componentDidMount() apostasDataB", apostasDataB);
		// console.info("inside componentDidMount() keysB", keysB);

		resp = await getClassificacao("A", keysA, apostasDataA, tabelaA);
		// console.info("inside componentDidMount() resp", resp);
		const classificacaoColumnsA = resp["classificacaoColumns"];
		const classificacaoDataA = resp["classificacaoData"];

		resp = await getClassificacao("B", keysB, apostasDataB, tabelaB);
		// console.info("inside componentDidMount() resp", resp);
		const classificacaoColumnsB = resp["classificacaoColumns"];
		const classificacaoDataB = resp["classificacaoData"];

		// console.info(
		// 	"inside componentDidMount() classificacaoColumnsA",
		// 	classificacaoColumnsA
		// );
		// console.info(
		// 	"inside componentDidMount() classificacaoDataA",
		// 	classificacaoDataA
		// );
		// console.info(
		// 	"inside componentDidMount() classificacaoColumnsB",
		// 	classificacaoColumnsB
		// );
		// console.info(
		// 	"inside componentDidMount() classificacaoDataB",
		// 	classificacaoDataB
		// );

		this.setState({
			serieA: {
				apostasColumns: apostasColumnsA,
				apostasData: apostasDataA,
				classificacaoColumns: classificacaoColumnsA,
				classificacaoData: classificacaoDataA,
				keys: keysA,
				tabela: tabelaA,
			},
			serieB: {
				apostasColumns: apostasColumnsB,
				apostasData: apostasDataB,
				classificacaoColumns: classificacaoColumnsB,
				classificacaoData: classificacaoDataB,
				keys: keysB,
				tabela: tabelaB,
			},
		});

		// console.info(
		// 	"after state change, this.state.serieB: ",
		// 	this.state.serieB
		// );
	};

	render() {
		// console.info("inside App.js render()");
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
								Apostas Série A
							</Menu.Item>
							<Menu.Item
								key="2"
								onClick={() => this.handleClick("B")}
							>
								<Link to="/" />
								Apostas Série B
							</Menu.Item>
							<Menu.Item
								key="3"
								onClick={() => this.handleClick("A")}
							>
								<Link to="/classificacao" />
								Classificação Série A
							</Menu.Item>
							<Menu.Item
								key="4"
								onClick={() => this.handleClick("B")}
							>
								<Link to="/classificacao" />
								Classificação Série B
							</Menu.Item>
							<Menu.Item
								key="5"
								onClick={() => this.handleClick("A")}
							>
								<Link to="/" />
								Distância pro acerto
							</Menu.Item>
							<Menu.Item
								key="6"
								onClick={() => this.handleClick("A", "6")}
							>
								<Link to="/" />
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
							</Routes>
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}></Footer>
				</Layout>
			</Router>
		);
	}
}
