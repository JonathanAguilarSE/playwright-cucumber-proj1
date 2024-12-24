const locators = {
    mainHeading: '.mb-5 > h1',
    subHeading: '#sub_heading',
    // headings: '.mb-5 > h1, #sub_heading',
    pContent: '#content',
    previousBtn: '#previous',
    nextBtn: '#next',
    cityInfo: ['.city_info, .country_info, .population_info'],
    cityBody: '.Pagination_pagBodyImage__W3ZkP',
    cityImage: '.city_image'
}

class PaginationPage {
    locators = locators

    // getHeading(headingText) {
    //     return page.locator(`${locators.headings}:has-text("${headingText}")`)
    // }

    async clickButtonByText(btnText) {
        await this.getButton(btnText).click()
    }

    getButton(button) {
        const buttons = {
            Previous: locators.previousBtn,
            Next: locators.nextBtn
        }

        if (!(button in buttons)) {
            throw new Error(`${button} not found`)
        }

        return page.locator(buttons[button])
    }

    async clickButtonUntilDisabled(btnText) {
        while(await this.getButton(btnText).isEnabled()) {
            
            await this.clickButtonByText(btnText)

            await this.getButton(btnText).isEnabled()
        }
    }

    getCityContainer(cityName) {
        return page.locator(`page.locators.cityBody:has(.city_info:has-text("${cityName}"))`)
    }
}

module.exports = PaginationPage