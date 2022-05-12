import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const TEST_ROUTERS = [
  "0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a", // live testnet router
  "0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1", // rahul test router
  "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6", // ci/shared router
  "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", // local router
];

const SKIP_SETUP = [
  1, 10, 25, 56, 250, 288, 137, 100, 122, 1285, 9001, 42161, 43114, 1284, 2001, 192837465, 1666600000,
];

const WRAPPED_ETH_MAP = new Map();
WRAPPED_ETH_MAP.set("1", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"); // mainnet WETH
WRAPPED_ETH_MAP.set("4", "0xc778417E063141139Fce010982780140Aa0cD5Ab"); // rinkeby WETH
WRAPPED_ETH_MAP.set("10", "0x4200000000000000000000000000000000000006"); // optimism WETH
WRAPPED_ETH_MAP.set("56", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"); // Binance Smart Chain WBNB
WRAPPED_ETH_MAP.set("137", "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"); // polygon WMATIC
WRAPPED_ETH_MAP.set("250", "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"); // fantom WFTM
WRAPPED_ETH_MAP.set("42161", "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"); // arbitrum WETH
WRAPPED_ETH_MAP.set("43114", "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"); // avalanche WAVAX
WRAPPED_ETH_MAP.set("100", "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"); // xdai wxDAI
WRAPPED_ETH_MAP.set("1285", "0x98878B06940aE243284CA214f92Bb71a2b032B8A"); // moonriver wMOVR
WRAPPED_ETH_MAP.set("1284", "0xAcc15dC74880C9944775448304B263D191c6077F"); // moonbeam wGLMR
/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let deployer;
  let routerFactoryDeployer;
  // eslint-disable-next-line prefer-const
  ({ deployer, routerfactory: routerFactoryDeployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log("deployer: ", deployer);
  console.log("routerFactoryDeployer: ", routerFactoryDeployer);

  await hre.deployments.deploy("TransactionManager", {
    from: deployer,
    args: [chainId],
    log: true,
  });

  const txManagerDeployment = await hre.deployments.get("TransactionManager");
  const txManagerAddress = txManagerDeployment.address;

  // IMPORTANT: cannot be deployed deterministic on all chains so we need to use a dedicated deployer for all new chains
  if (routerFactoryDeployer) {
    await hre.deployments.deploy("RouterFactory", {
      from: routerFactoryDeployer,
      args: [routerFactoryDeployer],
      log: true,
    });
    const routerFactoryDeployment = await hre.deployments.get("RouterFactory");
    const routerFactoryAddress = routerFactoryDeployment.address;
    console.log("routerFactoryAddress: ", routerFactoryAddress);
    const routerFactory = await hre.ethers.getContractAt("RouterFactory", routerFactoryAddress, routerFactoryDeployer);
    const exists = await routerFactory.transactionManager();
    if (exists === hre.ethers.constants.AddressZero) {
      console.log("Initing router factory");
      const initTx = await routerFactory.init(txManagerAddress, { from: routerFactoryDeployer });
      console.log("initTx: ", initTx);
      await initTx.wait();
    }
  } else {
    console.error("No router factory deployer, could not deploy router factory");
  }

  if (WRAPPED_ETH_MAP.has(chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    try {
      deployedPriceOracleAddress = (await hre.deployments.get("ConnextPriceOracle")).address;
    } catch (e) {
      console.log("ConnextPriceOracle not deployed yet");
    }
    await hre.deployments.deploy("ConnextPriceOracle", {
      from: deployer,
      args: [WRAPPED_ETH_MAP.get(chainId)],
      log: true,
    });

    const priceOracleDeployment = await hre.deployments.get("ConnextPriceOracle");
    const newPriceOracleAddress = priceOracleDeployment.address;
    if (deployedPriceOracleAddress && deployedPriceOracleAddress != newPriceOracleAddress) {
      console.log("Setting v1PriceOracle, v1PriceOracle: ", deployedPriceOracleAddress);
      const priceOracleContract = await hre.ethers.getContractAt("ConnextPriceOracle", newPriceOracleAddress);
      const tx = await priceOracleContract.setV1PriceOracle(deployedPriceOracleAddress, { from: deployer });
      console.log("setV1PriceOracle tx: ", tx);
      await tx.wait();
    }
  }

  console.log("Deploying multicall to configured chain");
  await hre.deployments.deploy("Multicall", {
    from: deployer,
    log: true,
  });

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain");
    await hre.deployments.deploy("TestERC20", {
      from: deployer,
      log: true,
    });

    await hre.deployments.deploy("Counter", {
      from: deployer,
      log: true,
    });

    if (!process.env.SKIP_SETUP) {
      console.log("Setting up test routers on chain", chainId);
      for (const router of TEST_ROUTERS) {
        await hre.run("setup-test-router", { router });
      }
    }
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};
export default func;
