import * as fs from "fs";
import * as path from "path";

const chalk = require("chalk");

function main() {
    const hardhatDeploymentsPath = path.join(__dirname, "../../hardhat/deployments");
    const subgraphAbisPath = path.join(__dirname, "../abis");

    if (!fs.existsSync(subgraphAbisPath)) {
        fs.mkdirSync(subgraphAbisPath, { recursive: true });
    }

    // Handle Localhost/Hardhat deployments if they exist
    if (fs.existsSync(hardhatDeploymentsPath)) {
        const networks = fs.readdirSync(hardhatDeploymentsPath);
        networks.forEach((network) => {
            const networkPath = path.join(hardhatDeploymentsPath, network);
            if (fs.lstatSync(networkPath).isDirectory()) {
                const files = fs.readdirSync(networkPath);
                files.forEach((file) => {
                    if (file.endsWith(".json")) {
                        const contractData = JSON.parse(fs.readFileSync(path.join(networkPath, file), "utf8"));
                        if (contractData.abi) {
                            fs.writeFileSync(
                                path.join(subgraphAbisPath, file),
                                JSON.stringify(contractData.abi, null, 2)
                            );
                            console.log(chalk.cyan(`Copied ABI for ${file} from Hardhat deployments.`));
                        }
                    }
                });
            }
        });
    } else {
        console.log(chalk.yellow("Hardhat deployments not found. Skipping ABI copy from hardhat."));
    }

    // Generate a basic networks.json if it doesn't exist
    const networksJsonPath = path.join(__dirname, "../networks.json");
    if (!fs.existsSync(networksJsonPath)) {
        const networksConfig = {
            localhost: {
                BatchRegistry: {
                    address: "0xDfa17B7e7b77c741e7C08f3F9fBa421e08c5EE6B", // Using target address as default for local if needed
                },
            },
        };
        fs.writeFileSync(networksJsonPath, JSON.stringify(networksConfig, null, 2));
        console.log(chalk.green("Generated default networks.json"));
    }
}

main();
