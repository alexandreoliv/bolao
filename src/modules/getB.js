const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
		headless: true,
	});

	const page = await browser.newPage();
	await page.goto(
		"https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2022_-_S%C3%A9rie_B#Classifica%C3%A7%C3%A3o",
		{
			waitUntil: "networkidle2",
		}
	);

	let times = [];
	for (let pos = 2; pos <= 21; pos++) {
		times.push({
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

	const fs = require("fs");
	fs.writeFile(
		"./src/data/tabelaB.json",
		JSON.stringify(times),
		function (err) {
			if (err) throw err;
			console.log("tabelaB.json complete");
		}
	);
	await browser.close();
})();
