const { Given, Then, When } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test")
const PaginationPage = require("../pages/PaginationPage");

const paginationPage = new PaginationPage

Given(/^the user is on "([^"]*)"$/, async function (url) {
	await page.goto(url)
});

Then(/^the user should see the "([^"]*)" heading$/, async function(headingText) {
    const $heading = await page.getByRole('heading', { name: `${headingText}`})
    // console.log($heading)
    await expect($heading).toHaveText(headingText)
});

Then(/^the user should see the "([^"]*)" paragraph$/, async function(contentText) {
	const $contentText = await page.locator(paginationPage.locators.pContent)
    await expect($contentText).toHaveText(contentText)
});

Then(/^the user should see the "([^"]*)" button is disabled$/, async function(btnText) {
	await expect(paginationPage.getButton(btnText)).toBeDisabled()
});

Then(/^the user should see the "([^"]*)" button is enabled$/, async function(btnText) {
	await expect(paginationPage.getButton(btnText)).toBeEnabled()
});

When(/^the user clicks on the "([^"]*)" button$/, async function(btnText) {
	await paginationPage.clickButtonByText(btnText)
});

When(/^the user clicks on the "([^"]*)" button till it becomes disabled$/, async function(btnText) {
	await paginationPage.clickButtonUntilDisabled(btnText)
});

Then(/^the user should see "([^"]*)" City with the info below and an image$/, async function(city, dataTable) {
    // const info = dataTable.rawTable.flat()
    // console.log(info)
    // const $cityInfo = await page.locator(paginationPage.locators.cityInfo)
    // console.log($cityInfo)
    // const $cityImage = await page.locator(paginationPage.locators.cityImage)

    // for (const [index, value] of info.entries()) {
    //     console.log(await expect(value).toHaveText(info[index]))
    //     await expect(value).toHaveText(info[index])
    // }


    // await expect($cityImage).toBeVisible()
    const expectedCityData = dataTable.hashes()[0];
    const cityContainer = paginationPage.getCityContainer(cityName);

    await expect(cityContainer.locator('.city_info')).toHaveText(`City: "${expectedCityData.City}"`);
    await expect(cityContainer.locator('.country_info')).toHaveText(`Country: "${expectedCityData.Country}"`);
    await expect(cityContainer.locator('.population_info')).toHaveText(`Population: "${expectedCityData.Population}"`);
    await expect(cityContainer.locator('.city_image')).toBeVisible();
});
