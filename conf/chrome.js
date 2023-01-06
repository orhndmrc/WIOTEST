'use strict'
import video from 'wdio-video-reporter'
/** @type WebdriverIO.Config */
const timeout = process.env.DEBUG ? 99999999 : 500000

const config = {
  runner: 'local',
  path: '/',
  capabilities: [
    {
      // Set maxInstances to 1 if screen recordings are enabled:
      maxInstances: 3,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        // Disable headless mode if screen recordings are enabled:
        args: ['--disable-gpu', '--window-size=1920,1080', '--disable-extensions',
          '--proxy-bypass-list=*', '--start-maximized', '--disable-dev-shm-usage', '--no-sandbox',
          '--ignore-certificate-errors', '--disable-background-networking'],
        prefs: {
          'download.default_directory': global.downloadDir
        }
      }
    }
  ],
  logLevel: 'error',
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }], [video, {
    saveAllVideos: false, // If true, also saves videos for successful test cases
    videoSlowdownMultiplier: 10 // Higher to get slower videos, lower for faster videos [Value 1-100]
  }]],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout,
    require: [],
    bail: 0
  },
  services: [
    ['chromedriver']
  ],
  specs: ['./test/specs/1-login.spec.js'],
  maximizeWindow: true,
  screenshots: {
    saveOnFail: true
  },
  videos: {
    enabled: false,
    resolution: '1440x900',
    startDelay: 500,
    stopDelay: 500

  },
  baseUrl: 'https://demoqa.com/books',
  waitforTimeout: 10000
}

exports.config = Object.assign({}, require('../hooks'), config)
