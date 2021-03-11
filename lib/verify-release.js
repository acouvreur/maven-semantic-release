const semver = require('semver')

const { getPomInfo, printVersion } = require('./util')

/**
 * Get the last release of the maven repository
 */
module.exports = async function verifyRelease(pluginConfig, context) {
  const { logger, options } = context
  printVersion(logger)

  const pomXml = await getPomInfo(logger)
  const pomVersion = pomXml.project.version[0]
  const lastReleaseVersion = context.lastRelease.version

  // check integrity of pom version
  if (!semver.valid(pomVersion)) {
    logger.log(
      'WARNING: pom.xml version of %s is an invalid semver version',
      pomVersion
    )
  }

  // make sure the difference in versions doesn't differ too much
  // this is sort of a safegaurd against the pom.xml version straying from the
  // git version too much through manual edits to pom.xml
  if (semver.inc(lastReleaseVersion, 'patch') !== semver.inc(pomVersion, 'patch')) {
    logger.log(
      `The pom.xml version of \`${pomVersion}\` differs too much from last git tag version of \`${lastReleaseVersion}\`.`
    )
  }
}
