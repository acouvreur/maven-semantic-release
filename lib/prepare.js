const { updateVersionInPomXml } = require('./maven')
const { printVersion } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease, options } = context
  printVersion(logger)

  // set and commit version number in pom.xml
  await updateVersionInPomXml(logger, nextRelease.version)
}
