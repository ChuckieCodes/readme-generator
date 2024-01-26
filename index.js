
const inquirer = require('inquirer');

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
  }
];

// start app here
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.log(answers);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// function call to initialize app
init();