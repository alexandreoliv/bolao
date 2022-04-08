import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import Apostas from "./Components/Apostas";
const { Header, Content, Footer } = Layout;

function App() {
	return (
		<Layout className="layout">
			<Header>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["1"]}
				>
					{new Array(5).fill(null).map((_, index) => {
						const key = index + 1;
						return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
					})}
				</Menu>
			</Header>
			<Content style={{ padding: "0 50px" }}>
				<Breadcrumb style={{ margin: "16px 0" }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className="site-layout-content">
					Bolão Brasileiro 2022 - Série A
					<Apostas />
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}></Footer>
		</Layout>
	);
}

export default App;
