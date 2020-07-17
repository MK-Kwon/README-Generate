const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api");
const markDown = require("./utils/generateMarkdown");

// the script uses promisify() to convert the callback-based function fs.writeFile() to the Promise-based function writeFileAsync().
const writeFileAsync = util.promisify(fs.writeFile);


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
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
        name: "install"
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

// The word “async” before a function means one simple thing: a function always returns a promise.
// ask the javascript engine running the code to wait for the writeToFile() function to complete before moving on to the next line to execute it. The writeToFile() function returns a Promise for which user will await 
async function writeToFile(fileName, data) {
    await writeFileAsync(fileName, data, function(err){
        if(err) {
            return console.log(err);
        }
        console.log("Success");
    });
}

function init() {
    inquirer.prompt(questions).then(async function(answers){
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        // The try statement consists of a try-block, which contains one or more statements. {} must always be used, even for single statements. At least one catch-block, or a finally-block, must be present. 
        // A catch-block contains statements that specify what to do if an exception is thrown in the try-block. If any statement within the try-block (or in a function called from within the try-block) throws an exception, control is immediately shifted to the catch-block. If no exception is thrown in the try-block, the catch-block is skipped.
        try {
            // 1. Grab username and answers 
            const userData = await api.getUser(answers.username);
            // Object.assign(target, ...sources) - 1. target: It is the target object from which values and properties have to be copied.  2. It is the source object to which values and properties have to be copied.
            // 2. Assign the data from 1 to a markdown
            const data = Object.assign({}, answers, userData.data.data.user);
            // 3. Save the markdown from 2 to README.md file
            const markStr = markDown.generateMarkdown(data);
            
            writeToFile("README.md", markStr);
            // if functions within try throws an error print error on console.    
        } catch(err) {
            console.log(err);
        }
        
    });
}   

init();