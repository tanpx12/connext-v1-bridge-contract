import { waffle } from "hardhat";
import { expect, use } from "chai";
import { utils } from "ethers";
import { solidity } from "ethereum-waffle";
import { deployContract, MAX_FEE_PER_GAS } from "../utils";

use(solidity);

// import types
import { getContractError } from "../../src/errors";
import { LibAssetTest } from "../../typechain/LibAssetTest";
import { TestERC20 } from "../../typechain/TestERC20";
import { BigNumber, constants } from "ethers";

const { AddressZero } = constants;

const createFixtureLoader = waffle.createFixtureLoader;
describe("LibAsset", () => {
  const [wallet, other, receiver] = waffle.provider.getWallets();

  let libAssetTest: LibAssetTest;
  let token: TestERC20;

  const fixture = async () => {
    libAssetTest = await deployContract<LibAssetTest>("LibAssetTest");

    token = await deployContract<TestERC20>("TestERC20");
    return { libAssetTest, token };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    ({ libAssetTest, token } = await loadFixture(fixture));
  });

  it("should deploy", async () => {
    expect(libAssetTest.address).to.be.a("string");
    expect(token.address).to.be.a("string");
  });

  describe("#isNativeAsset", () => {
    it("should return true if assetId is AddressZero", async () => {
      const res = await libAssetTest.isNativeAsset(AddressZero);
      expect(res).to.be.true;
    });

    it("should return false if assetId is Non-AddressZero", async () => {
      const res = await libAssetTest.isNativeAsset("0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
      expect(res).to.be.false;
    });
  });

  describe("#getOwnBalance", () => {
    it("should error if erc20 contract doesn't exist", async () => {
      await expect(libAssetTest.getOwnBalance("0x0f5d2fb29fb7d3cfee444a200298f468908cc940")).to.be.reverted;
    });

    it("should return native asset balance if AddressZero", async () => {
      const amount = utils.parseEther("1");
      // const signer = await wallet.getSigner();

      await wallet.sendTransaction({
        to: libAssetTest.address,
        value: amount,
      });

      const res = await libAssetTest.getOwnBalance(AddressZero);
      expect(BigNumber.isBigNumber(res)).to.be.true;
      expect(res).to.be.eq(amount);
    });

    it("should return Erc20 asset balance if Non-AddressZero", async () => {
      const amount = BigNumber.from(1);
      const Erc20TokenAddress = token.address;

      await token.connect(wallet).transfer(libAssetTest.address, amount);
      const res = await libAssetTest.connect(other).getOwnBalance(Erc20TokenAddress);

      expect(BigNumber.isBigNumber(res)).to.be.true;
      expect(res).to.be.eq(amount);
    });
  });

  describe("#transferNativeAsset", () => {
    it("should fail if transferring ether fails", async () => {
      await expect(
        libAssetTest.connect(wallet).transferNativeAsset(wallet.address, BigNumber.from(10_000)),
      ).to.be.revertedWith("Address: insufficient balance");
    });

    it("happy case: transferNativeAsset", async () => {
      const amount = BigNumber.from(1);

      await wallet.sendTransaction({
        to: libAssetTest.address,
        value: utils.parseEther(amount.toString()),
      });

      await libAssetTest.connect(wallet).transferNativeAsset(receiver.address, amount);
    });
  });

  describe("#transferERC20", () => {
    it("happy case: transferERC20", async () => {
      const amount = BigNumber.from(1);

      const transfer = await token.connect(wallet).transfer(libAssetTest.address, amount);
      await transfer.wait();

      const approveRes = await token.connect(wallet).approve(libAssetTest.address, amount);
      await approveRes.wait();

      expect(await token.balanceOf(receiver.address)).to.be.eq(0);

      const res = await libAssetTest.connect(wallet).transferERC20(token.address, receiver.address, amount);
      await res.wait();

      expect(await token.balanceOf(receiver.address)).to.be.eq(amount);
    });
  });

  describe("increaseERC20Allowance", () => {
    it("should revert if its ether", async () => {
      await expect(
        libAssetTest.increaseERC20Allowance(AddressZero, wallet.address, "10", { maxFeePerGas: MAX_FEE_PER_GAS }),
      ).to.be.revertedWith(getContractError("increaseERC20Allowance: NO_NATIVE_ASSET"));
    });

    it("should work", async () => {
      const amount = 100;
      const starting = await token.allowance(libAssetTest.address, other.address);

      const tx = await libAssetTest.increaseERC20Allowance(token.address, other.address, 100, {
        maxFeePerGas: MAX_FEE_PER_GAS,
      });
      await tx.wait();

      const final = await token.allowance(libAssetTest.address, other.address);
      expect(final).to.be.eq(starting.add(amount));
    });
  });

  describe("decreaseERC20Allowance", () => {
    it("should revert if its ether", async () => {
      await expect(
        libAssetTest.decreaseERC20Allowance(AddressZero, wallet.address, "10", { maxFeePerGas: MAX_FEE_PER_GAS }),
      ).to.be.revertedWith(getContractError("decreaseERC20Allowance: NO_NATIVE_ASSET"));
    });

    it("should work", async () => {
      const amount = 100;

      // Increase allowance
      const increaseTx = await libAssetTest.increaseERC20Allowance(token.address, other.address, 100, {
        maxFeePerGas: MAX_FEE_PER_GAS,
      });
      await increaseTx.wait();

      const starting = await token.allowance(libAssetTest.address, other.address);

      const decreaseTx = await libAssetTest.decreaseERC20Allowance(token.address, other.address, 100, {
        maxFeePerGas: MAX_FEE_PER_GAS,
      });
      await decreaseTx.wait();

      const final = await token.allowance(libAssetTest.address, other.address);
      expect(final).to.be.eq(starting.sub(amount));
    });
  });
});
