// Contracts
const Token = artifacts.require('./Token');

// Utils
const metamaskAccounts = ['ADDRESS_1', 'ADDRESS_2'];
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';
const EVM_REVERT = 'VM Exception while processing transaction: revert';
const ether = (n) => {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether')
	);
};
const tokens = (n) => ether(n);
const wait = (seconds) => {
	const milliseconds = seconds * 1000;
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = async function (callback) {

	try {
		// Fetch accounts from wallet - these are unlocked
		const ganacheAccounts = await web3.eth.getAccounts();

		// Fetch the deployed token
		const token = await Token.deployed();
		console.log('Token fetched', token.address);

		// Give tokens to accounts
		const sender = ganacheAccounts[0];
		const receiver1 = metamaskAccounts[0];
		const receiver2 = metamaskAccounts[1];

		let tokenAmount = web3.utils.toWei('10000', 'ether'); // 10,000 tokens
		let ethAmount = web3.utils.toWei('10', 'ether'); // 10,000 tokens

		// Transfer ETH
		await web3.eth.sendTransaction({ from: sender, to: receiver1, value: ethAmount });
		console.log(`Transferred ${ethAmount} ETH from ${sender} to ${receiver1}`);
		await web3.eth.sendTransaction({ from: sender, to: receiver2, value: ethAmount });
		console.log(`Transferred ${ethAmount} ETH from ${sender} to ${receiver2}`);

		// Transfer Tokens
		await token.transfer(receiver1, tokenAmount, { from: sender });
		console.log(`Transferred ${tokenAmount} tokens from ${sender} to ${receiver1}`);
		await token.transfer(receiver2, tokenAmount, { from: sender });
		console.log(`Transferred ${tokenAmount} tokens from ${sender} to ${receiver2}`);

	} catch (error) {
		console.log(error);
	}

	callback();
}