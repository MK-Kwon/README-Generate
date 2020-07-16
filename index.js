const inquirer = require("inquirer");
const fs = require("fs");
const api = require("./utils/api.js");


const questions = [
    {
        message: "Enter your Github Username.",
        name: "Username"
    },
    {
        message: "Enter the title of your project.",
        name: "Title"
    },
    {
        type: "editor",
        message: "What are the steps required to install your project? Provide a step by step description of how to get the development environment running",
        name: "Install"
    },
    {
        type: "list",
        message: "Choose a license that fits best for your project",
        name: "License",
        choices: [
            "Apache License 2.0",
            "GNU GPLv3",
            "MIT",
            "ISC"
        ]
    },
    {
        message: "List your collaborators, if any.",
        name: "credits"
    },
    {
        message: "Provide examples on how to run your test",
        name: "tests"
    }
];

function writeToFile(fileName, data) {
    fs.writeFile("repos.txt", repoNamesStr, function(err){
        if(err) {
            return console.log(err);
        }
        console.log("Success");
    });
}

function init() {
    inquirer.prompt(questions).then(function(answers){
        console.log(answers);
        api.getUser(answers.username);
    });
}   

init();