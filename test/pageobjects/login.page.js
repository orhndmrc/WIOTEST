import Page from './page'
import testData from '../data/testdata'

class LoginPage extends Page {
  #initToken = false
  #baseUrl = super.getEndpoint()
  async initialize () {
    if (!this.#initToken) {
      this.userNameBox = await $('#userName')
      this.passwordBox = await $('#password')
      this.submit = await $('#login')
      this.logoutBtn = await $('//*[text()="Log out"]')

      this.#initToken = true
    }
  }

  async login (username, password) {
    await this.open(testData.endpoint)
    await this.submit.click()
    await this.userNameBox.waitForDisplayed()
    await this.userNameBox.setValue(username)
    await this.passwordBox.setValue(password)
    await this.submit.click()
  }

  async open (myurl) {
    await super.open(myurl)
    await browser.pause(2000)
    return this
  }

  async logout () {
    await this.logoutBtn.waitForDisplayed()
    await this.logoutBtn.click()
  }
}

export default new LoginPage()
