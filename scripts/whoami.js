// import "@nomiclabs/hardhat-ethers";
// import { ethers } from "hardhat";

async function main() {

    const accounts = await ethers.getSigners();
    console.log(accounts[0].address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });