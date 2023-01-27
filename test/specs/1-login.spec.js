/* eslint-disable no-unused-vars */
import LoginPage from '../pageobjects/login.page'
// const utilities = require("../../support/utils/Utilities");
import testData from '../data/testdata'
const { expect } = require('chai')

before(async function () {
  await LoginPage.initialize()
})

afterEach(async function () {
  await LoginPage.logout()
})

describe('Login', () => {
  let count = 1
  it((count++) + '. should login with valid credentials - C1', async () => {
    await LoginPage.open(testData.endpoint)
    console.log(await browser.getTitle())
    await LoginPage.submit.click()
    await LoginPage.userNameBox.waitForDisplayed()
    await LoginPage.userNameBox.setValue(testData.userName)
    await LoginPage.passwordBox.setValue(testData.password)
    await LoginPage.submit.click()
  })

  it((count++) + '. should login  - C2', async () => {
    await LoginPage.login(testData.userName, testData.password)
  })
})
