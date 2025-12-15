import puppeteer from 'puppeteer';
import fs from 'fs';

//Scrape laptops
async function scrapeLaptops() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');


    let pageNr= 1
    let hasPagesLeft = true;
    let allProducts = []
    let pageTitle = "temp"



    while (hasPagesLeft) {

        await page.goto(`https://www.coolblue.be/nl/laptops/filter/besturingssysteem:windows,macos/processor-laptops:amd-ryzen-5,intel-core-i7-intel-core-7,apple-m4?pagina=${pageNr}`, { waitUntil: 'networkidle0' });
        if (pageTitle === "temp")
            pageTitle = await page.$eval('.filtered-search__header h1', (element) => element.textContent.trim());
        const products = await page.$$eval('.product-card', (rows) => {
            return rows.map((row) => {

                const highlights = Array.from(
                    row.querySelectorAll('.dynamic-highlight__key--with-explanation')
                    // /\n/g is voor de /n weg te halen & /\s+/g is voor alle spaties ter vervangen naar 1 spatie
                ).map(elem => elem.textContent.trim().replace(/\n/g , '').replace(/\s+/g, ' '));

                return {

                    laptop: row.querySelector('.product-card__title').textContent.trim(),
                    availability: row.querySelector('.button--order') ? "Beschikbaar" : "Niet beschikbaar",
                    reviews: row.querySelector('.review-rating').textContent.trim(),
                    laptopHighlights: highlights.join(" | ").trim(),
                    price: Number(row.querySelector('.sales-price__current').textContent.slice(0,-2).replace(".", ""))
                }
            })
        })

        if (products.length === 0)
            hasPagesLeft = false;
        else
        {
            pageNr++;
            allProducts.push(...products);
        }
    }

    const filteredProducts = allProducts
        .filter(p => p.price > 600 && (p.laptopHighlights.includes('15,6 inch') || p.laptopHighlights.includes('14,2 inch') || p.laptopHighlights.includes('15,3')))
        .sort((a, b) => b.price - a.price)
        .map(p => ({
            ...p,
            price: `€${p.price}`
        }));

    //The laptops:
    console.log(pageTitle);
    console.log(filteredProducts);
    fs.writeFileSync('laptopScraper/laptops.json', JSON.stringify(filteredProducts,null, 2), 'utf8');

    //The Checks
    console.log("///////////")
    console.log("Checks:");
    console.log(`The amount of laptops is: ${allProducts.length}`); // = 57 op moment van maken
    let errorCounter = 0;
    for (const p of filteredProducts) {
        if (p.price < 600 || !(p.laptopHighlights.includes('15,6 inch') || p.laptopHighlights.includes('14,2 inch') || p.laptopHighlights.includes('15,3 inch')))
        {
            console.log(`Error with laptop: ${p.laptop} does not meet the requirements`);
            errorCounter++;
        }
    }
    console.log(`we found ${errorCounter} errors with the filter option`);

    await browser.close();
}

export { scrapeLaptops };
