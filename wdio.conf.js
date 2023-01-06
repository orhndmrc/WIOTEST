'use strict'
import { join } from 'path'
global.downloadDir = join(__dirname, 'tempDownloads')
global.testType = 'local'

if (global.testType === 'local') {
  global.hostname = 'localhost'
  exports.config = require('./conf/chrome').config
}
