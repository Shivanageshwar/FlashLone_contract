const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlashLoan", function () {
  let flashLoan;
  let owner;
  let mockPool;
  let mockPoolAddressesProvider;
  let mockToken;

  beforeEach(async function () {
    // Deploy MockERC20
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockToken = await MockERC20.deploy("Mock Token", "MTK");
    await mockToken.waitForDeployment();

    // Deploy MockPool
    const MockPool = await ethers.getContractFactory("MockPool");
    mockPool = await MockPool.deploy();
    await mockPool.waitForDeployment();

    // Deploy MockPoolAddressesProvider with MockPool address
    const MockPoolAddressesProvider = await ethers.getContractFactory("MockPoolAddressesProvider");
    mockPoolAddressesProvider = await MockPoolAddressesProvider.deploy(mockPool.target);
    await mockPoolAddressesProvider.waitForDeployment();

    // Deploy FlashLoan contract
    const FlashLoan = await ethers.getContractFactory("FlashLoan");
    flashLoan = await FlashLoan.deploy(mockPoolAddressesProvider.target);
    await flashLoan.waitForDeployment();

    [owner] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await flashLoan.owner()).to.equal(owner.address);
    });

    it("Should deploy successfully", async function () {
      expect(flashLoan.target).to.be.properAddress;
    });
  });

  describe("Flash Loan Request", function () {
    it("Should allow requesting a flash loan", async function () {
      const amount = ethers.parseEther("100");

      // This should not revert with the mock setup
      await expect(flashLoan.requestFlashLoan(mockToken.target, amount)).to.not.be.reverted;
    });
  });

  describe("Balance and Withdraw", function () {
    it("Should return token balance", async function () {
      const balance = await flashLoan.getBalance(mockToken.target);
      expect(balance).to.equal(0); // Initially 0
    });

    it("Should allow owner to withdraw tokens", async function () {
      // Mint some tokens to the flashLoan contract
      await mockToken.mint(flashLoan.target, ethers.parseEther("10"));

      // Check balance
      expect(await flashLoan.getBalance(mockToken.target)).to.equal(ethers.parseEther("10"));

      // Withdraw
      await flashLoan.withdraw(mockToken.target);

      // Check balance after withdraw
      expect(await flashLoan.getBalance(mockToken.target)).to.equal(0);
    });
  });
});
