const confirmAnswerValidator = input => input !== "";
const questions1 = [
    {   type: 'input', 
        name: 'title',
        message: 'Enter title for your repository: ',
        validate: confirmAnswerValidator 
    },
    {
        type: 'confirm',
        name: 'createTable',
        message: 'Would you like to create "content table"?'
    }
];
const questions2 = [
    {   type: 'input', 
        name: 'usage', 
        message: 'Enter some usage information:', 
        validate: confirmAnswerValidator 
    },
    {   type: 'input', 
        name: 'description', 
        message: 'Enter little description about the project:', 
        validate: confirmAnswerValidator
    },
    {   type: 'input', 
        name: 'installation', 
        message: 'Enter installation details:', 
        validate: confirmAnswerValidator
    },
    {   type: 'list', 
        name: 'license', 
        message: 'Enter license information: ', 
        choices: ['MIT License', 'Apache License 2.0', 'The Unlicense', 'GNU GPL v3.0', 'Eclipse Public License 2.0']
    },
    {   type: 'input', 
        name: 'contribute', 
        message: 'Enter contributing code of conduct:', 
        default: 'Code of Conduct: Standard (Fork, Clone, Commit, Push and Create Pull requests).' 
    },
    {   type: 'input', 
        name: 'test', 
        message: 'Enter test applicable:', 
        default: 'npm run test' 
    },
    {   type: 'input', 
        name: 'email', 
        message: 'Enter email id:', 
    }
];

module.exports = {
    confirmAnswerValidator,
    questions1,
    questions2
};




