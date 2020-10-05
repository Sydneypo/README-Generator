const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What is your GitHub username?"
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },
    {
        type: 'input',
        name: 'title',
        message: "What is your project's title?"
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a breif description of your project.'
    },
    {
        type: 'list',
        name: 'license',
        choices: [
            'MIT',
            'Unlicense',
            'Apache 2.0',
            'GNU v3',
            'BSD 3-Clause',
            'Mozilla Public License 2.0'
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What command should be run to install dependencies?',
        default: 'npm i'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What command should be run to run tests?',
        default: 'npm run test'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about using the repository?'
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'What does the user need to know about contributing to the repository?'
    },
    
];

const promptUser = () => {
    return inquirer 
        .prompt(questions);
}

// function to write README file
function writeToFile (fileName, data) {
    return writeFileAsync(fileName, data);
}

// function to initialize program
function init() {
    try {
        console.log("Welcome to the README generator.\nPlease anser the following questions:")

        const answers = promptUser();

        const fileContent = generateMarkdown(answers);

        writeToFile("./output/README.md", fileContent);

        console.log("README.md created in output folder.");

    } catch (err) {
        console.error("Error creating README. File not created.");
    }
}

// function call to initialize program
init();

