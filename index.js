const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = [];
const teamMembers = [];

const appMenu = () => {
    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    }

    // function to create-team //

    function addTeam() {
        inquirer.prompt([

            {
                type:"list",
                name:"memberChoice",
                message:"which type of team member would you like to add?",
                choices: [ "Engineer", "Intern", "I dont want to add any more team memebers"],
            },
        ]).then((userChoice) => {
            if(userChoice.memeberChoice === "Engineer") {
                addEngineer();
            } else if(userChoice.memeberChoice === "Intern") {
                addIntern();
            } else {
                buildTeam();
            }
        });
    }

    // codes to add teams memeber // 

    function addManager() {
        inquirer.prompt([

            {
                type:"input",
                name:"managerName",
                message:"what's your manager's name",
            },

            {
                type:"input",
                name:"managersId",
                message:"what's the manager's employee Id number?"
            },

            {
                type:"input",
                name:"managerEmail",
                message:"what's the manager's email address?",
            },

            {
                type:"input",
                name:"managerOfficeNumber",
                message:"what's the manager's office number?",
            },

        ]).then(answers => {
            const manager = new manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            addTeam();
        });
    }

    function addEngineer() {
        inquirer.prompt([
                
            {
                type:"type",
                name:"engineerName",
                message:"What's the engineer's name?",
            },

            {
                type:"type",
                name:"engineerid",
                message:"What's the engineer's employee number?",
            },

            {
                type:"type",
                name:"engineerEmail",
                message:"What's the engineer's email address?",
            },

            {
                type:"type",
                name:"engineerGithub",
                message:"What's the engineer's Github username?",
            }
        ]).then(answers =>{
            const engineer = new engineer(answer.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            addTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            
            {
                type:"input",
                name:"interName",
                message:"what's the intern's name?",
            },

            {
                type:"input",
                name:"internId",
                message:"what's the intern's employee Id number?",
            },

            {
                type:"input",
                name:"internEmail",
                message:"what's the intern's email address?",
            },

            {
                type:"input",
                name:"internSchool",
                message:"what's the school's name that the intern attends?",
            }
        ]).then(answers => {
            const intern = new intern( answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idList.push(answers.internId);
            addTeam();
        });
    }

};

appMenu();