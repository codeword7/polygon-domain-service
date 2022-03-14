const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("panda");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("neeraj", { value: hre.ethers.utils.parseEther('0.1') });
    await txn.wait();
    console.log("Minted domain neeraj.panda");

    txn = await domainContract.setRecord("neeraj", "Am I a neeraj or a panda??");
    await txn.wait();
    console.log("Set record for neeraj.panda");

    const address = await domainContract.getAddress("neeraj");
    console.log("Owner of domain neeraj:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
