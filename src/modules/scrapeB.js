const scrapeB = async () => {
	const browser = await launchBrowser();
	const page = await openPage(browser);
	const tabela = await scrapeTabela(page);
	exportTabelaAsJSON(tabela);
	await browser.close();
};

const launchBrowser = () => {
	const puppeteer = require("puppeteer");
	const browser = puppeteer.launch({
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
		headless: true,
	});
	return browser;
};

const openPage = async (browser) => {
	const page = await browser.newPage();
	await page.goto(
		"https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2022_-_S%C3%A9rie_B#Classifica%C3%A7%C3%A3o",
		{
			waitUntil: "networkidle2",
		}
	);
	return page;
};

const scrapeTabela = async (page) => {
	let tabela = [];
	for (let pos = 2; pos <= 21; pos++) {
		tabela.push({
			time: {
				nome_popular: await page.$eval(
					`.wikitable:nth-child(22) tr:nth-child(${pos})> td:nth-child(2) > a:nth-child(2)`,
					(el) => el.innerText
				),
			},
			posicao: await page.$eval(
				`.wikitable:nth-child(22) tr:nth-child(${pos}) > td:nth-child(1)`,
				(el) => Number(el.innerText)
			),
		});
	}
	return tabela;
};

const exportTabelaAsJSON = (tabela) => {
	const fs = require("fs");
	fs.writeFile(
		"../data/tabelaB.json",
		JSON.stringify(tabela),
		function (err) {
			if (err) throw err;
			console.log("tabelaB.json complete");
		}
	);
};

scrapeB();
