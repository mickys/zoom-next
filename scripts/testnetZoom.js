function getNow() {
    return Math.floor(Date.now() / 1000);
}

async function main() {

    let gasCost = ethers.BigNumber.from(0);
    let txnCnt = 0;

    const accounts = await ethers.getSigners();
    console.log(accounts[0].address);

    const Artifacts = await ethers.getContractFactory("Zoom2");
    
    const saleNFTDeployedInstance = await Artifacts.deploy();

    await saleNFTDeployedInstance.deployed();
    let tx = await saleNFTDeployedInstance.provider.getTransactionReceipt(saleNFTDeployedInstance.deployTransaction.hash);

    const saleNFT = new ethers.Contract(saleNFTDeployedInstance.address, Artifacts.interface, accounts[0]);

    txnCnt++;
    gasCost = gasCost.add( tx.cumulativeGasUsed );

    console.log("");
    console.log("    Step 1: Deploy Contract")
    console.log("       - hash:                ", saleNFTDeployedInstance.deployTransaction.hash);
    console.log("       - ZoomContract:        ", saleNFTDeployedInstance.address);
    console.log("       - GasUsed:             ", tx.cumulativeGasUsed.toNumber());
    console.log("");

    console.log("    Deployment tnxCount:       ", txnCnt)
    console.log("    Deployment gasCost in wei: ", gasCost.toNumber())

   // npx hardhat verify --network rinkeby --contract contracts/Zoom2.sol:Zoom2 "0xC878B3C422BeECB879dE0a2bea01D30C88F0ccdc"

   // npx hardhat verify --network mainnet --contract contracts/Zoom2.sol:Zoom2 "0x3D4F573904B98066887332EdeF1b3f9b155e8080"
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


    