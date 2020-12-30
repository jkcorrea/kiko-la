const format = require('format-package')

const { defaults } = format

module.exports = {
  ...defaults,
  transformations: {
    // Don't sort scripts
    scripts: (key, prevValue) => [key, prevValue],
  },
}
