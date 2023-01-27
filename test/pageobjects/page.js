
const assert = require('assert')
import testData from '../data/testdata'

export default class Page {
  constructor () {
    this.title = 'ToolsQA'
    this.baseUrl = 'https://demoqa.com/books'
  }

  async open (path) {
    console.log(testData.endpoint)
    await browser.url(path)
    await browser.pause(2000)
    assert.strictEqual(await browser.getTitle(), this.title)
  }

  verifyTextInPage (text) {
    const pageText = $('body').getText()
    const position = pageText.search(text)
    chai.expect(position).to.be.above(0)
  }

  getEndpoint () {
    return this.baseUrl
  }
}
