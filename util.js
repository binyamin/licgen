const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const {list} = require('./list.json');

const getFullname = () => {
    let pkg;
    if (fs.existsSync('package.json')) {
        pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    }
    let {author} = pkg;
    
    if (typeof author === "object") {
        return author.name
    }
    else if (typeof author === 'string') {
        return author.replace(/(\(.+\))|(\<.+\>)/g, '').trim();
    } else {
        return null;
    }
}

/**
 * 
 * @param {String} str The string to "hashify"
 */

const hashify = str => {
    return String(str).toLowerCase().replace(/\s|\./g, '-');
}
/**
 * 
 * @param {String} lic The license type
 */
const getLicense = lic => {
    return list.filter(l => {
        let subArray = (l.aliases || []).concat(l.name);
        return subArray.filter(t => hashify(t) === hashify(lic)).length > 0
    })[0]
}
/**
 * 
 * @param {String} lic The license to create
 */

const create = async (lic) => {
    console.log(`Creating ${lic} license` )
    let questions = [];
    let {txt, notice} = getLicense(lic);
    let opts = txt.match(/\[[^\[\]]+\]/g) ? txt.match(/\[[^\[\]]+\]/g).map(w => w.slice(1, -1).toLowerCase()) : [];

    if(opts.includes('year')) {
        questions.push({
            name: "year",
            type: "number",
            message: "Please enter the year",
            default: new Date().getFullYear(),
            validate: (n) => {
                return (n >= 1900 && n <= 2100) || 'Please provide a year between 1900 and 2100'
            }
        })

        opts = opts.filter(o => o !== 'year');
    }

    if(opts.includes('fullname')) {
        questions.push({
            name: "fullname",
            type: "input",
            message: "Please enter your full name",
            default: getFullname(),
            validate: (n) => {
                return (n !== "") || 'Please enter your name'
            }
        })

        opts = opts.filter(o => o !== 'fullname');
    }

    opts.forEach(option => {
        questions.push({
            name: option,
            type: "input",
            message: option,
            validate: v => (Boolean(v.length) || 'Please answer the prompt')
        })
    })

    let answers = await inquirer.prompt(questions);
    Object.keys(answers).forEach((a) => {
        txt = txt.replace(new RegExp('\\[' + a + '\\]', 'igm'), String(answers[a]))
    })

    await fs.writeFileSync('LICENSE.md', txt);
    
    console.log(chalk.green(`Success! Created ${lic} license in LICENSE.md`))
    if(notice) {
        console.log(chalk.yellow('You should add the following text to your readme:'))
        console.log(notice)
        console.log(chalk.yellow('End of Notice'))
        process.exit();
    }
}

/**
 * @description Prompt the user to choose a license type
 */

const prompt = async () => {
    let {type} = await inquirer.prompt({
        name: "type",
        type: "list",
        message: "Which license would you like to create?",
        choices: list.map(n => n.name)
    })

    create(type);
}

module.exports = {
    create,
    prompt,
    hashify,
    getLicense
}