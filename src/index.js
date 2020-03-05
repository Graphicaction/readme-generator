const chalk = require('chalk');
const inquirer = require('inquirer');
const axios = require("axios");
const fs = require('fs');
const main = require('./questions.js');
const questions1 = main.questions1;
const questions2 = main.questions2;
let contents = [];
let contentsFlag = false;
let avatar;
//Github call function by prompting user to enter github username
inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
      const queryUrl = `https://api.github.com/users/${username}`;
      axios.get(queryUrl)
      .then(response => {
        //saving user's avatar then calling function to prompt for other readme details
        avatar = response.data.avatar_url;
        createQuestions();
      });
  })
  .catch(err => console.log(err)); 

  let title = "";
//Function to ask title and prompt for table of contents
function createQuestions() {
    inquirer
    .prompt(questions1)
    .then(function(reply) { 
        title = `# ${reply.title}\n`;
        //if add create table option is "Y" call function to add contents else just proceed to other set of questions
        if(reply.createTable) 
            askContents();
        else 
            askNextQuestions();
    })
}

//function to create table of contents and other inputs
function askContents(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'content',
            message: 'Enter content name: ',
        },
        {
            type: 'confirm',
            name: 'addContent',
            message: 'Would you like to add another content in "content table"?'
        }
    ])
    .then(ans => {
    //pushing some details into contents array then asking if user wants to enter more contents
      contents.push(ans.content);
      if (ans.addContent) {
        askContents();
      } else {
          //Flag to maintain synchronous call
            contentsFlag = true;
            return contentsFlag;
      }
    })
    .then(() => {
        if(contentsFlag){
            inquirer
            .prompt(questions2)
            .then(answers => createReadme(answers));
        }
    });
}
function askNextQuestions(){
    inquirer
    .prompt(questions2)
    .then(answers => createReadme(answers));
}
//Function to create Readme and writing it into a file
const createReadme = data => {
    //Creating TOC(if any), badges, description, usage, license etc. details for readme
    let tableOfContents;
    const badge = `\n![Build Status](https://img.shields.io/badge/build-passing-green.svg) `;
    const badgeLicense = (data.license).split(" ");
    const badge2 = `  ![License: MIT](https://img.shields.io/badge/License-${badgeLicense[0]}-blue.svg)\n`
    if(contents.length < 1) {
        tableOfContents = "";
    } else {
        tableHeading =  `## Table of contents:\n`;
        let subContents = "";
        for(let i = 0; i < contents.length; i++) {
            let tempContents = contents[i].toLowerCase();
            subContents += `-   [ ${contents[i]} ](#${tempContents})\n`;
        }
        tableOfContents = tableHeading + subContents;
    }
    const description = `## <a name="description"></a>Description:\n${data.description}\n`;
    const installation = `## <a name="installation"></a>Installation:\n  \`\`\`bash    \n  ${data.installation}\n\`\`\`\n`;
    const usage = `## <a name="usage"></a>Usage:\n \`\`\`bash   \n${data.usage}\n \`\`\`\n`;
    const license = `## <a name="license"></a>License:\n <i>${data.license}. All rights reserved.</i>\n`;
    const contributors = `## <a name="contributing"></a>Contributing:\n${data.contribute}\n`;
    const test = `## <a name="test"></a>Test:\n   \`\`\`bash  \n    ${data.test} \n\`\`\`\n`;
    const email = `## Email:\n <i>${data.email}</i>\n`;
    const profileImage = `\n<img src='${avatar}' height='50' width='50' style="border-radius: 50%;"/>`
    
    let readmeText = title + badge + badge2 + tableOfContents +  description + installation + usage + contributors + test + email + license + profileImage;
    //write to a new file named readme.md
    fs.writeFile('myReadme.md',readmeText, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log("Created Readme!");
    });
}





