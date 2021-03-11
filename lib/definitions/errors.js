/* eslint-disable sort-keys */ // for better readability

module.exports = {
  ENOPOMPROJECT: () => ({
    message: 'Missing `project` entry in `pom.xml` file',
    details: `The \`project\` entry must be included in the \`pom.xml\` file.`
  }),
  ENOPOMPROJECTARTIFACTID: () => ({
    message: 'Missing `artifactId` entry in `project` entry in `pom.xml` file',
    details: `The \`artifactId\` entry must be included in the \`project\` entry in the \`pom.xml\` file.`
  }),
  ENOPOMPROJECTGROUPID: () => ({
    message: 'Missing `groupId` entry in `project` entry in `pom.xml` file',
    details: `The \`groupId\` entry must be included in the \`project\` entry in the \`pom.xml\` file.`
  }),
  ENOPOMPROJECTVERSION: () => ({
    message: 'Missing `version` entry in `project` entry in `pom.xml` file',
    details: `The \`version\` entry must be included in the \`project\` entry in the \`pom.xml\` file.`
  }),
  ENOPOMXML: () => ({
    message: 'Missing `pom.xml` file.',
    details: `The \`pom.xml\` file could not be found in this repository.`
  }),
  EREADPOMXML: () => ({
    message: 'Error parsing `pom.xml` file.',
    details: 'An error was encountered while reading the `pom.xml` file.  Please make sure the file contains valid xml.'
  })
}
