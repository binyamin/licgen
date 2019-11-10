const fs = require('fs');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));

const util = require('./util');

let pkg;
if (fs.existsSync('package.json')) {
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
}
/**
 * @todo Support Aliasing licenses
 */

const run = async () => {
    console.log("NOTE: This will overwrite any file named `license.md` existing in the root directory.")
    if(args.type && args.type !== true) {
        // Is requested license supported?
        if(util.isLicSupported(util.hashify(args.type))) {
            util.create(args.type)
        } else {
            console.log(chalk.red('The license you requested either could not be found or is not supported. You may open an issue, if you wish.'));
            util.prompt();
        }
    }
    
    console.log("No license requested")

    // Check for license in package.json

    if(pkg && pkg.license) {
        // License found
        console.log('Identified license from package.json')

        if(util.isLicSupported(util.hashify(pkg.license))) {
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