const AggregateError = require('aggregate-error')

const { getError, getPomInfo, printVersion } = require('./util')

/**
 * Verify that the maven project is properly setup to allow deployment to maven central
 */
module.exports = async function verifyConditions(pluginConfig, context) {
  const { logger, options } = context
  printVersion(logger)

  // make sure pom.xml file is good to go
  logger.log('validating pom.xml')
  const pomXml = await getPomInfo(logger)
  validatePomXml(pomXml)
  logger.log('pom.xml validation successful')
}

/**
 * Validate that the contents of pom.xml appear to be setup properly
 */
function validatePomXml(pomXml) {
  if (!pomXml) {
    throw getError('EREADPOMXML')
  }

  const pomValidationErrors = []

  if (!pomXml.project) {
    pomValidationErrors.push(getError('ENOPOMPROJECT'))
  } else {
    if (!pomXml.project.groupId || pomXml.project.groupId.length === 0) {
      pomValidationErrors.push(getError('ENOPOMPROJECTGROUPID'))
    }
    if (!pomXml.project.artifactId || pomXml.project.artifactId.length === 0) {
      pomValidationErrors.push(getError('ENOPOMPROJECTARTIFACTID'))
    }
    // does the version need to be set if using semantic-release?
    if (!pomXml.project.version || !pomXml.project.version.length === 0) {
      pomValidationErrors.push(getError('ENOPOMPROJECTVERSION'))
    }
  }

  if (pomValidationErrors.length > 0) {
    throw new AggregateError(pomValidationErrors)
  }
}
