import puppeteer from "puppeteer";
import fs from "fs";


const gomibo = async () => {
    const browser = await puppeteer.launch({headless: 'new'})
    const page = await browser.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');

    let pageNr = 1;
    let hasPagesLeft = true;
    let allProducts = []

    while (hasPagesLeft) {
        await page.goto(`https://www.gomibo.be/nl/telefoon?page=${pageNr}`, {waitUntil: 'networkidle0'});

        const products = await page.$$eval('.grid-product-item', (rows) => {
            return rows.map((row) => {

                return {
                    phone: row.querySelector('.offer-item-title').textContent.trim(),
                    reviews: (row.querySelector('.legacy-rating__review-amount')?.textContent.replace(/[^\d]/g, "") || "Geen reviews"),
                    avgReviewScore: (row.querySelector('.legacy-rating-text')?.textContent.match(/[\d,.]+/)?.[0].replace(',', '.') || "Geen score"),
                    price: Number(row.querySelector('.price.price--default.price--large').textContent.slice(0,-2).replace("€ ", "").replace(",", "").replace(".", "")),
                    detailLink: row.querySelector('.offer-item-title a')?.href || ''
                }
            })
        } )
        if (products.length === 0 || pageNr > 10)
             hasPagesLeft = false;
        else
        {
             pageNr++;
             allProducts.push(...products);
        }
    }
    await browser.close();
    //console.log(allProducts);
    fs.writeFileSync('priceComparerScrapers/gomibo.json', JSON.stringify(allProducts,null, 2), 'utf8');
    return allProducts;
}

export {gomibo}
