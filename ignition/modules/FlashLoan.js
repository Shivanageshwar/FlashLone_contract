// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Aave PoolAddressesProvider address for localhost (mock or fork)
// For mainnet/testnet, replace with actual address
const POOL_ADDRESSES_PROVIDER = "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e"; // Aave v3 mainnet, adjust for testnet/local

module.exports = buildModule("FlashLoanModule", (m) => {
  const addressProvider = m.getParameter("addressProvider", POOL_ADDRESSES_PROVIDER);

  const flashLoan = m.contract("FlashLoan", [addressProvider]);

  return { flashLoan };
});
