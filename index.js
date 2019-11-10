const fs = require('fs');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));

const util = require('./util');
const {list} = require('./list.json');
let pkg;

if (fs.existsSync('package.json')) {
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
}
/**
 * @todo Is package.json license supported?
 * @todo Support Aliasing licenses
 * @todo Confirm overwriting existing license
 * @todo Add auto-recognition of `fullname`
 * @todo Manage empty arg
 */

const run = async () => {
    if(args.lic) {
        // Is requested license supported?
        let isLicSupported = Boolean(list.filter(l => (util.hashify(l.name) === util.hashify(args.lic)))[0].name);
        if(!isLicSupported) {
            // License is not supported
            console.log(chalk.red('The license you requested either could not be found or is not supported. You may open an issue, if you wish.'));
            process.exit();
        }
        
        // License is supported
        return util.create(args.lic)
    }
    
    console.log("No license requested")

    // Check for license in package.json

    if(pkg && pkg.license) {
        // License found
        console.log('Identified license from package.json')
        util.create(pkg.license);
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