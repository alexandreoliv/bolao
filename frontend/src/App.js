import "./App.css";
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import Distancia from "./Components/Distancia";
import Regras from "./Components/Regras";
import AddAposta from "./Components/AddAposta";
import { getData } from "./modules/getData";
const { Header, Content, Footer } = Layout;

export const App = () => {
	const [component, setComponent] = useState({
		ano: 2023,
		serie: "A",
		page: "classificacao",
	});
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
							setComponent({
								ano: 2023,
								serie: "A",
								page: "addAposta",
							})
						}
					>
						Adicionar Aposta A
					</Menu.Item>
					<Menu.Item
						key="23"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "B",
								page: "addAposta",
							})
						}
					>
						Adicionar Aposta B
					</Menu.Item>

					<Menu.SubMenu key="s1" title="2023">
						<Menu.ItemGroup title="Série A">
							<Menu.Item
								key="1"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "A",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="2"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "A",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="3"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "A",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
						<Menu.ItemGroup title="Série B">
							<Menu.Item
								key="4"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "B",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="5"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "B",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="6"
								onClick={() =>
									setComponent({
										ano: 2023,
										serie: "B",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>

					<Menu.SubMenu key="s2" title="2022">
						<Menu.ItemGroup title="Série A">
							<Menu.Item
								key="7"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "A",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="8"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "A",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="9"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "A",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
						<Menu.ItemGroup title="Série B">
							<Menu.Item
								key="10"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "B",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="11"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "B",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="12"
								onClick={() =>
									setComponent({
										ano: 2022,
										serie: "B",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>

					<Menu.SubMenu key="s3" title="2021">
						<Menu.ItemGroup title="Série A">
							<Menu.Item
								key="13"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "A",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="14"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "A",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="15"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "A",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
						<Menu.ItemGroup title="Série B">
							<Menu.Item
								key="16"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "B",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="17"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "B",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="18"
								onClick={() =>
									setComponent({
										ano: 2021,
										serie: "B",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>

					<Menu.SubMenu key="s4" title="2020">
						<Menu.ItemGroup title="Série A">
							<Menu.Item
								key="19"
								onClick={() =>
									setComponent({
										ano: 2020,
										serie: "A",
										page: "classificacao",
									})
								}
							>
								Classificação
							</Menu.Item>
							<Menu.Item
								key="20"
								onClick={() =>
									setComponent({
										ano: 2020,
										serie: "A",
										page: "apostas",
									})
								}
							>
								Apostas
							</Menu.Item>
							<Menu.Item
								key="21"
								onClick={() =>
									setComponent({
										ano: 2020,
										serie: "A",
										page: "distancia",
									})
								}
							>
								Distância
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>

					<Menu.Item
						key="24"
						onClick={() =>
							setComponent({
								...component,
								page: "regras",
							})
						}
					>
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
					Bolão Brasileiro
				</h1>
				<div
					className="site-layout-content"
					style={{ padding: "10px 0 0 0 " }}
				>
					{component.page === "apostas" ? (
						<Apostas
							ano={component.ano}
							serie={component.serie}
							apostasColumns={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.apostasColumns)[0]
							}
							apostasData={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.apostasData)[0]
							}
						/>
					) : component.page === "classificacao" ? (
						<Classificacao
							ano={component.ano}
							serie={component.serie}
							classificacaoColumns={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.classificacaoColumns)[0]
							}
							classificacaoData={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.classificacaoData)[0]
							}
						/>
					) : component.page === "distancia" ? (
						<Distancia
							ano={component.ano}
							serie={component.serie}
							distanciaColumns={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.distanciaColumns)[0]
							}
							distanciaData={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.distanciaData)[0]
							}
						/>
					) : component.page === "addAposta" ? (
						<AddAposta
							ano={component.ano}
							serie={component.serie}
							equipes={
								dados
									.filter(
										(d) =>
											d.ano === component.ano &&
											d.serie === component.serie
									)
									.map((d) => d.tabela.equipes)[0]
							}
						/>
					) : component.page === "regras" ? (
						<Regras />
					) : null}
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}></Footer>
		</Layout>
	);
};
