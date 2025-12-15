import puppeteer from "puppeteer";
import fs from "fs";


const coolBlueScraper = async () => {
    const browser = await puppeteer.launch({headless: 'new'})
    const page = await browser.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    );

    let pageNr= 1
    let hasPagesLeft = true;
    let allProducts = []
    let pageTitle = "temp"

    while (hasPagesLeft) {
        await page.goto(`https://www.coolblue.be/nl/mobiele-telefoons?pagina=${pageNr}`, {waitUntil: 'networkidle0'});
        if (pageTitle === "temp")
            pageTitle = await page.$eval('.filtered-search__header h1', (element) => element.textContent.trim());
        const products = await page.$$eval('.product-card', (rows) => {
            return rows.map((row) => {

                const highlights = Array.from(
                    row.querySelectorAll('.product-card__highlights')
                    // /\n/g is voor de /n weg te halen & /\s+/g is voor alle spaties ter vervangen naar 1 spatie
                ).map(elem => elem.textContent.trim().replace(/\n/g , '').replace(/\s+/g, ' '));

                return {
                    phone: row.querySelector('.product-card__title').textContent.trim(),
                    availability: row.querySelector('.button--order') ? "Beschikbaar" : "Niet beschikbaar",
                    reviews: row.querySelector('.review-rating').textContent.trim(),
                    phoneHighlights: highlights.join(" | ").trim(),
                    price: Number(row.querySelector('.sales-price__current').textContent.slice(0,-2).replace(".", "")),
                    detailLink: row.querySelector('.product-card__title a')?.href || ''
                }
            })
        } )

        allProducts.push(...products);

        if (products.length === 0 || pageNr >7)
            hasPagesLeft = false;
        else
        {
            pageNr++;
        }
    }
    await browser.close();
    fs.writeFileSync('priceComparerScrapers/coolBlueScraper.json', JSON.stringify(allProducts,null, 2), 'utf8');
    return allProducts;
}

export {coolBlueScraper}
