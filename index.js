#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));

const util = require('./util');

let pkg;
if (fs.existsSync('package.json')) {
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
}

const run = async () => {
    console.log('Running LicGen...')
    console.log(chalk.yellow("This will overwrite any file named `license.md` existing in the root directory."))
    if(args.type && args.type !== true) {
        // Is requested license supported?
        if(util.getLicense(util.hashify(args.type))) {
            return util.create(util.getLicense(util.hashify(args.type)).name)
        } else {
            console.log(chalk.red('The license you requested either could not be found or is not supported. You may open an issue, if you wish.'));
            return util.prompt();
        }
    }
    
    console.log("No license requested")

    // Check for license in package.json

    if(pkg && pkg.license) {
        // License found
        console.log('Identified license from package.json')

        if(util.getLicense(util.hashify(pkg.license))) {
            util.create(pkg.license);
        } else {
            console.log('License in package.json is not supported or not readable')
            util.prompt();
        }
    } else if(pkg && !pkg.license) {
        // No license found
        console.log('Could not find license field in package.json');
        util.prompt();
    } else {
        // Package.json not found
        console.log("Could not find package.json")
        util.prompt();
    }
}

run();