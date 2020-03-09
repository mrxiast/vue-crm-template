'use strict'
const BASE_URL = `${process.env.ENV_NAME}` == 'test' ? '"http://localhost:8080"' : '"https://xxx.xxx.com"'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: BASE_URL,
}
