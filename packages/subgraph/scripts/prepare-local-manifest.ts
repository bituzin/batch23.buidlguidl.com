import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const localNetwork = "localhost";
const networksFilePath = path.join(__dirname, "../networks.json");
const templateFilePath = path.join(__dirname, "../subgraph.template.yaml");
const outputFilePath = path.join(__dirname, "../subgraph.yaml");

interface NetworkConfig {
    [network: string]: {
        [contractName: string]: {
            address: string;
            startBlock?: number;
        };
    };
}

const main = async () => {
    if (!fs.existsSync(networksFilePath)) {
        console.error("❌ networks.json not found");
        process.exit(1);
    }

    if (!fs.existsSync(templateFilePath)) {
        console.error("❌ subgraph.template.yaml not found");
        process.exit(1);
    }

    const networks: NetworkConfig = JSON.parse(fs.readFileSync(networksFilePath, "utf8"));
    const networkConfig = networks[localNetwork];

    if (!networkConfig) {
        console.error(`❌ Configuration for network '${localNetwork}' not found in networks.json`);
        process.exit(1);
    }

    // Assuming we are interested in the BatchRegistry contract
    const contractName = "BatchRegistry";
    const contractConfig = networkConfig[contractName];

    if (!contractConfig) {
        console.error(`❌ Configuration for contract '${contractName}' not found in networks.json for network '${localNetwork}'`);
        process.exit(1);
    }

    let templateContent = fs.readFileSync(templateFilePath, "utf8");

    // Replace placeholders
    templateContent = templateContent.replace(/{{network}}/g, localNetwork);
    templateContent = templateContent.replace(/{{address}}/g, contractConfig.address);
    templateContent = templateContent.replace(/{{startBlock}}/g, (contractConfig.startBlock || 0).toString());

    fs.writeFileSync(outputFilePath, templateContent);

    console.log(`✅ Generated subgraph.yaml for ${localNetwork} with address ${contractConfig.address}`);
};

main();
