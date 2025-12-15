import puppeteer from 'puppeteer';
import fs from 'fs';
//fs is voor het wegschrijven naar json

// Scrape Playstations
async function scrapePlaystations() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');
  await page.goto('https://www.coolblue.be/nl/consoles/playstation5', { waitUntil: 'networkidle0' });

  const pageTitle = await page.$eval('.filtered-search__result-info h1', (element) => element.textContent.trim());
  const products = await page.$$eval('.product-card', (rows) => {
    return rows.map((row) => ({
      productTitle: row.querySelector('.product-card__title').textContent.trim(),
      availability: row.querySelector('.button--order') ? "Beschikbaar" : "Niet beschikbaar",
      price: row.querySelector('.sales-price__current').textContent.slice(0,-2),


    }));
  });



  const filteredProducts = products.filter(p => p.price > 600);

  console.log(pageTitle);
  console.log(filteredProducts);
  fs.writeFileSync('playstationScraper/playstations.json', JSON.stringify(filteredProducts,null, 2), 'utf8');

  await browser.close();
}

export { scrapePlaystations };
