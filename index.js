const inquirer = require('inquirer');
const { generateMarkdown, renderLicenseSection, renderLicenseBadge }  = require('./utils/generateMarkdown');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'username',
    message: 'Enter your GitHub username: '
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email: '
  },
  {
    type: 'input',
    name: 'project',
    message: 'Enter your project name:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a brief project description:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions (separate steps by comma):',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter test instructions:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter contributing details (if there is any):',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose license to be sused in the project:',
    choices: [
      'Apache',
      'Academic',
      'GNU',
      'ISC',
      'MIT',
      'Mozilla',
      'Open',
    ]
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  // destructure answers object
  const { project, description, installation, usage, contributing, tests, license, username, email } = data;

  const projectName = generateMarkdown(project);

  const licenseBadge = renderLicenseBadge(license);
  const licenseSection = renderLicenseSection(license);

  // make html template
  const readMeTemplate = `
${projectName}

${licenseBadge}<br />

## Description
${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${installation.trim().split(', ').map(item => `- ${item}`).join('\n')}

## Usage
- ${usage}

## Contributing
${contributing}

## Tests
${tests}

${licenseSection}

## Questions
I'm on Github --> [${username}](https://github.com/${username})<br />

Got questions? Reach out to me by send me an e-mail ${email}<br />
  `;

  fs.writeFile(fileName, readMeTemplate, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Answers successfully written to file:', fileName);
    }
  });
}

// start app here
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // file path

      // make custom name
      const project = answers.project.split(" ").join('-');
      const filePath = `./examples/README-${project}.md`;

      // write to file
      writeToFile(filePath, answers)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// function call to initialize app
init();