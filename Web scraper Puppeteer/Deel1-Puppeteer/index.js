import {scrapePlaystations} from "./playstationScraper/playstation.js";
import {scrapeLaptops} from "./laptopScraper/laptops.js"
import {KMIScraper} from "./weatherScraper/KMIScraper.js";
import {coolBlueScraper} from "./priceComparerScrapers/coolBlueScraper.js";
import {gomibo} from "./priceComparerScrapers/gomibo.js";
import promptSync from 'prompt-sync';


const mainMenuItems = ["Playstation", "Laptops", "Price Comparer","Temparature now"]
const weathermenuItems = ["Turnhout","Brugge","Brussel","Gent"]
const prompt = promptSync({sigint: true})
showMenu(mainMenuItems)
const userInput = readUserInput()

if ( userInput === 1 )
    await scrapePlaystations()
else if ( userInput === 2 )
    await scrapeLaptops()
else if ( userInput === 3 )
    await showScrapedItems()
else if ( userInput === 4 )
    await showWeatherScrapedTemperature()











//Methods
function readUserInput()
{
    let userInput = "temp"
    do {
        userInput = prompt("Make your choice: ")
        userInput = Number(userInput)


    }while(isNaN(userInput) || userInput > 4 || userInput < 0)
    return userInput;
}

async function showWeatherScrapedTemperature()
{
    showMenu(weathermenuItems)
    const userInput = readUserInput()

    if( userInput === 1 )
        await KMIScraper("Turnhout")
    else if ( userInput === 2 )
        await KMIScraper("Brugge")
    else if ( userInput === 3 )
        await KMIScraper("Brussel")
    else if ( userInput === 4 )
        await KMIScraper("Gent")

}

async function showScrapedItems()
{
    const coolBlueItems = await coolBlueScraper()
    const gamiboItems = await gomibo()

    for (const item of coolBlueItems)
    {
        const match = gamiboItems.find(x => x.phone.toLowerCase().includes(item.phone.toLowerCase()));
        if(match)
        {
            console.log(`Het product: ${item.phone}`)
            console.log(`kost bij coolblue: ${item.price}`)
            console.log(`en bij gamibo: ${match.price}`)
            console.log(`dat is een verschil van ${item.price - match.price} euro`)
            console.log("------------------------------------------------------------------")
        }
    }


}

function showMenu(menu)
{
    let counter = 1;
    console.log("Choose one of the following items to load in:");
    for (const item of menu)
    {
        console.log(`${counter}. ${item}`);
        counter++;
    }

}

