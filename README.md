# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
⚡ FlashLoan & FlashLoanArbitrage (Aave v3)
📖 Overview

This project demonstrates how to implement Aave v3 Flash Loans in Solidity for DeFi automation and arbitrage opportunities.
It includes two contracts:

FlashLoan.sol → A minimal working example of an Aave flash loan.

FlashLoanArbitrage.sol → A practical example that integrates a DEX interface to perform simulated arbitrage between USDC and DAI.

The project also contains deployment scripts and test contracts for end-to-end execution.

🧠 Key Concepts

Flash Loans: Borrow assets instantly with zero collateral, as long as they are repaid within the same transaction.

Aave v3 Integration: Uses FlashLoanSimpleReceiverBase and IPoolAddressesProvider.

ERC20 Handling: Transfers, approvals, and balances using OpenZeppelin’s IERC20.

DEX Interaction: Demonstrates deposit, buy, and sell logic for arbitrage execution.

⚙️ Contracts Overview
1️⃣ FlashLoan.sol

A base contract to:

Request flash loans from Aave v3 Pool

Execute arbitrary logic in executeOperation()

Repay the loan + premium

Manage token balances and owner withdrawals

2️⃣ FlashLoanArbitrage.sol

An extended contract that:

Integrates with a mock DEX (IDex interface)

Performs sample arbitrage:

Borrow USDC via flash loan

Deposit USDC to DEX

Buy and sell DAI for simulated profit

Repay Aave loan + premium

🧰 Tools & Dependencies

Solidity ^0.8.26

Aave v3 Core Contracts

OpenZeppelin Contracts (IERC20)

Foundry / Hardhat / Remix (for testing and deployment)

🪙 Network Setup

Deployed & tested on Goerli testnet (Aave v3 test deployment).

Token	Address (Goerli)
DAI	0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464
USDC	0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43
DEX	0xD6e8c479B6B62d8Ce985C0f686D39e96af9424df
🚀 Usage
📦 1. Install Dependencies
npm install

⚙️ 2. Compile Contracts
npx hardhat compile
# or
forge build

🧪 3. Run Tests
npx hardhat test
# or
forge test

💥 4. Deploy Contract
npx hardhat run scripts/deploy.js --network goerli

💰 5. Request Flash Loan
await flashLoan.requestFlashLoan(USDC_ADDRESS, "1000000000"); // 1000 USDC

🔐 Security & Notes

For educational and testing purposes only.

Do not deploy to mainnet without auditing or secure randomness for arbitrage logic.

Replace Goerli addresses with current testnet (e.g., Sepolia) if Goerli is deprecated.

🧭 Future Improvements

Integrate real on-chain DEX (e.g., Uniswap or Curve).

Use Chainlink price feeds for real arbitrage conditions.

Automate profit-taking logic and multi-token support.

Add event logging for flash loan execution tracking.

👨‍💻 Author

Shiva Nageshwar
Smart Contract Developer

🏷️ License

MIT License – Free to use, learn, and modify.
