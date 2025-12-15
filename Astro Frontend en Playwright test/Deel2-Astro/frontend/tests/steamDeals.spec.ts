import { test, expect } from '@playwright/test';

test('has a list of games', async ({ page }) => {
  await page.goto('/astro-build');
  await page.waitForSelector('#game-list-id');
  const games = await page.$$('[data-testid="gameLabelTestId"]')
  expect(games.length).toBeGreaterThan(1);

});

test('Has Input field and is usable ', async ({ page }) => {
  await page.goto('/astro-build');
  const inputField = page.locator('[data-testid="searchInputFieldTestId"]');
  await expect(inputField).toBeVisible();

  await inputField.fill('Test@123')
  await expect(inputField).toHaveValue(`Test@123`);

});

//3) De frontend toont de juiste games na het filteren via de slider
//4) De frontend toont de juiste games na het filteren via de zoekfunctie en de slider tegelijk
//Ik heb test 3 / 4 te samen gezet omdit deze toch voor 90% dezelfde code zijn.

test('Shows te correct games after filtering with search function & slider ', async ({ page }) => {
  await page.goto('/astro-build');
  const slider = page.locator('[data-testid="sliderDiscountTestId"]');
  await slider.fill('30')
  expect(slider).toHaveValue("30")

  const inputField = page.locator('[data-testid="searchInputFieldTestId"]');
  await inputField.fill('III')
  expect(inputField).toHaveValue("III")

  const games = await page.$$('[data-testid="gameLabelTestId"]:not(.hidden)')
  expect(games.length).toBeGreaterThan(0);

  for (const game of games) {

    // @ts-ignore zegt dat textContent mogelijks null is
    const discountPercentageHTML = await game.$eval('[data-testid="discountPercentageTestId"]', el => el.textContent.trim().replace("%", ""));
    const discountPercentageNumber = Number(discountPercentageHTML);
    // @ts-ignore
    const gameTitle = await game.$eval('[data-testid="titleTestId"]', el => el.textContent.trim())

    expect(gameTitle).toContain("III")
    expect(discountPercentageNumber).toBeGreaterThanOrEqual(30)
  }

});




