const { access, constants } = require('fs')
const { exec } = require('./util')

/**
 * @return './mvnw' if we have wrapper in the project root, 'mvn' otherwise
 */
async function findCommand() {
  return new Promise((resolve, reject) => {
    access('mvnw', constants.F_OK, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve('mvn')
        } else {
          reject(err)
        }
      } else {
        resolve('./mvnw')
      }
    })
  })
}

/**
 * Change the version number in the pom.xml file(s). This also includes the
 * command option to delete the backup pom files as they are not needed and can
 * create unneccessary files that shouldn't be checked in to version control.
 * See https://www.mojohaus.org/versions-maven-plugin/set-mojo.html#generateBackupPoms
 */
async function updateVersionInPomXml(logger, versionStr) {
  logger.log(`Updating pom.xml to version ${versionStr}`)
  const command = await findCommand()
  await exec(
    command,
    ['versions:set', `-DprocessAllModules`, '-DgenerateBackupPoms=false', `-DnewVersion=${versionStr}`]
  )
}

module.exports = {
  updateVersionInPomXml
}
