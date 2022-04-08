import "./App.css";
import { Layout, Menu } from "antd";
import Apostas from "./Components/Apostas";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

function App() {
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
						<Menu.Item key="1">
							<Link to="/" />
							Apostas
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/" />
							Rodadas{" "}
						</Menu.Item>
						<Menu.Item key="3">
							<Link to="/" />
							Classificação
						</Menu.Item>
						<Menu.Item key="4">
							<Link to="/" />
							Distância pro acerto
						</Menu.Item>
						<Menu.Item key="5">
							<Link to="/" />
							Regras
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: "0 50px" }}>
					<h1 style={{textAlign: "center", fontWeight: "bold", margin: "10px 0"}}>Bolão Brasileiro 2022 - Série A</h1>
					<div className="site-layout-content" style={{ padding: "10px 0 0 0 " }}>
						<Routes>
							<Route path="/" element={<Apostas />} />
						</Routes>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}></Footer>
			</Layout>
		</Router>
	);
}

export default App;
