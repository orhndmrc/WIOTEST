/* eslint-disable no-unused-vars */

'use strict'

/* global browser */

const cmds = require('wdio-screen-commands')
const chai = require('chai')
const chaiWebdriver = require('chai-webdriverio').default
const fs = require('fs')

/** @type WebdriverIO.HookFunctionExtension */
const config = {
  before: async () => {
    const AllureReporter = require('@wdio/allure-reporter')
    global.allure = AllureReporter
    // Add browser commands:
    browser.addCommand('saveScreenshotByName', cmds.saveScreenshotByName)
    browser.addCommand('saveAndDiffScreenshot', cmds.saveAndDiffScreenshot)
    // Add element commands:
    browser.addCommand('saveScreenshotByName', cmds.saveScreenshotByName, true)
    browser.addCommand(
      'saveAndDiffScreenshot',
      cmds.saveAndDiffScreenshot,
      true
    )
    if (browser.config.appium) { await browser.updateSettings(browser.config.appium) }
    if (browser.config.maximizeWindow) await browser.maximizeWindow()
  },
  beforeTest: async test => {
    // await cmds.startScreenRecording(test)
    chai.use(chaiWebdriver(browser))

    global.assert = chai.assert
    global.should = chai.should

    const allure = require('@wdio/allure-reporter').default
    browser.maximizeWindow()
    allure.addEnvironment('BROWSER', browser.capabilities.browserName)
    allure.addEnvironment('BROWSER_VERSION', browser.capabilities.version)
    allure.addEnvironment('PLATFORM', browser.capabilities.platform)
    allure.addDescription(`${new Date().toLocaleString()} - Generating Allure reports - ` + test.title)
    allure.addTestId('TC - ' + test.title)
  },
  afterTest: async function (step, scenario, { error, duration, passed }, context) {
    if (error) {
      await browser.takeScreenshot()
    }
  }
  /* afterTest: async (test, context, result) => {
    await Promise.all([
      cmds.stopScreenRecording(test, result),
      cmds.saveScreenshotByTest(test, result)
    ])
    if (fs.existsSync(global.downloadDir)){
      // if it exist, delete it
      fs.rmdirSync(global.downloadDir, { recursive: true, force: true } )
    }
  } */
}

module.exports = config
