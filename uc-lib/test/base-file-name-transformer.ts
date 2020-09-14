// tslint:disable-next-line: no-var-requires
const path = require("path")

/**
 * transformer for jest to transform path/to/originalfilename.ext to contents: originalfilename.ext
 */
module.exports = {
  process(src, filename, config, options) {
    const localName = JSON.stringify(path.basename(filename))
    return `module.exports = ${localName}`
  },
}
