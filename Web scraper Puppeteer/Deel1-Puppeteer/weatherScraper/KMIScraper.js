import puppeteer from "puppeteer";

const KMIScraper = async (chosenCity) => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
        await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    );
    await page.goto(`https://www.meteo.be/nl/${chosenCity}`, {waitUntil: 'networkidle0'});


    const temperature = await page.$eval(
        '.observation-pp__inner__forecast__temp__degree.style-scope.observation-comp',
        el => el.textContent.trim() || ''
    );
    await browser.close();
    const temp = Number(temperature);
    console.log(`The weather in ${chosenCity} right now is ${temp} degrees celcius`);
};

export { KMIScraper };
