const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts; 
//We keep only the contract

fs.ensureDirSync(buildPath);
//Check if dir exists, if not : create

console.log(output);
for (let contract in output) {
    console.log('contract : ' + contract);
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    )
}