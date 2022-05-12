/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ConnextPriceOracleInterface extends ethers.utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "aggregators(address)": FunctionFragment;
    "assetPrices(address)": FunctionFragment;
    "getPriceFromChainlink(address)": FunctionFragment;
    "getPriceFromDex(address)": FunctionFragment;
    "getPriceFromOracle(address)": FunctionFragment;
    "getTokenPrice(address)": FunctionFragment;
    "isPriceOracle()": FunctionFragment;
    "priceRecords(address)": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setAggregators(address[],address[])": FunctionFragment;
    "setDexPriceInfo(address,address,address,bool)": FunctionFragment;
    "setDirectPrice(address,uint256)": FunctionFragment;
    "setV1PriceOracle(address)": FunctionFragment;
    "v1PriceOracle()": FunctionFragment;
    "wrapped()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(functionFragment: "aggregators", values: [string]): string;
  encodeFunctionData(functionFragment: "assetPrices", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getPriceFromChainlink",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceFromDex",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceFromOracle",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isPriceOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceRecords",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setAggregators",
    values: [string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setDexPriceInfo",
    values: [string, string, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setDirectPrice",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setV1PriceOracle",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "v1PriceOracle",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "wrapped", values?: undefined): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "aggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriceFromChainlink",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriceFromDex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPriceFromOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDexPriceInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDirectPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setV1PriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "v1PriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wrapped", data: BytesLike): Result;

  events: {
    "AggregatorUpdated(address,address)": EventFragment;
    "DirectPriceUpdated(address,uint256,uint256)": EventFragment;
    "NewAdmin(address,address)": EventFragment;
    "PriceRecordUpdated(address,address,address,bool)": EventFragment;
    "V1PriceOracleUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AggregatorUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DirectPriceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PriceRecordUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "V1PriceOracleUpdated"): EventFragment;
}

export type AggregatorUpdatedEvent = TypedEvent<
  [string, string] & { tokenAddress: string; source: string }
>;

export type DirectPriceUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    token: string;
    oldPrice: BigNumber;
    newPrice: BigNumber;
  }
>;

export type NewAdminEvent = TypedEvent<
  [string, string] & { oldAdmin: string; newAdmin: string }
>;

export type PriceRecordUpdatedEvent = TypedEvent<
  [string, string, string, boolean] & {
    token: string;
    baseToken: string;
    lpToken: string;
    _active: boolean;
  }
>;

export type V1PriceOracleUpdatedEvent = TypedEvent<
  [string, string] & { oldAddress: string; newAddress: string }
>;

export class ConnextPriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ConnextPriceOracleInterface;

  functions: {
    admin(overrides?: CallOverrides): Promise<[string]>;

    aggregators(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    assetPrices(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getPriceFromChainlink(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPriceFromDex(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPriceFromOracle(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenPrice(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isPriceOracle(overrides?: CallOverrides): Promise<[boolean]>;

    priceRecords(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, boolean] & {
        token: string;
        baseToken: string;
        lpToken: string;
        active: boolean;
      }
    >;

    setAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAggregators(
      tokenAddresses: string[],
      sources: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDexPriceInfo(
      _token: string,
      _baseToken: string,
      _lpToken: string,
      _active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDirectPrice(
      _token: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setV1PriceOracle(
      _v1PriceOracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    v1PriceOracle(overrides?: CallOverrides): Promise<[string]>;

    wrapped(overrides?: CallOverrides): Promise<[string]>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  aggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

  assetPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  getPriceFromChainlink(
    _tokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPriceFromDex(
    _tokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPriceFromOracle(
    _tokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenPrice(
    _tokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isPriceOracle(overrides?: CallOverrides): Promise<boolean>;

  priceRecords(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, boolean] & {
      token: string;
      baseToken: string;
      lpToken: string;
      active: boolean;
    }
  >;

  setAdmin(
    newAdmin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAggregators(
    tokenAddresses: string[],
    sources: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDexPriceInfo(
    _token: string,
    _baseToken: string,
    _lpToken: string,
    _active: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDirectPrice(
    _token: string,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setV1PriceOracle(
    _v1PriceOracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  v1PriceOracle(overrides?: CallOverrides): Promise<string>;

  wrapped(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    aggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

    assetPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getPriceFromChainlink(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceFromDex(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceFromOracle(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPrice(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPriceOracle(overrides?: CallOverrides): Promise<boolean>;

    priceRecords(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, boolean] & {
        token: string;
        baseToken: string;
        lpToken: string;
        active: boolean;
      }
    >;

    setAdmin(newAdmin: string, overrides?: CallOverrides): Promise<void>;

    setAggregators(
      tokenAddresses: string[],
      sources: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setDexPriceInfo(
      _token: string,
      _baseToken: string,
      _lpToken: string,
      _active: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setDirectPrice(
      _token: string,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setV1PriceOracle(
      _v1PriceOracle: string,
      overrides?: CallOverrides
    ): Promise<void>;

    v1PriceOracle(overrides?: CallOverrides): Promise<string>;

    wrapped(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AggregatorUpdated(address,address)"(
      tokenAddress?: null,
      source?: null
    ): TypedEventFilter<
      [string, string],
      { tokenAddress: string; source: string }
    >;

    AggregatorUpdated(
      tokenAddress?: null,
      source?: null
    ): TypedEventFilter<
      [string, string],
      { tokenAddress: string; source: string }
    >;

    "DirectPriceUpdated(address,uint256,uint256)"(
      token?: null,
      oldPrice?: null,
      newPrice?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { token: string; oldPrice: BigNumber; newPrice: BigNumber }
    >;

    DirectPriceUpdated(
      token?: null,
      oldPrice?: null,
      newPrice?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { token: string; oldPrice: BigNumber; newPrice: BigNumber }
    >;

    "NewAdmin(address,address)"(
      oldAdmin?: null,
      newAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldAdmin: string; newAdmin: string }
    >;

    NewAdmin(
      oldAdmin?: null,
      newAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldAdmin: string; newAdmin: string }
    >;

    "PriceRecordUpdated(address,address,address,bool)"(
      token?: null,
      baseToken?: null,
      lpToken?: null,
      _active?: null
    ): TypedEventFilter<
      [string, string, string, boolean],
      { token: string; baseToken: string; lpToken: string; _active: boolean }
    >;

    PriceRecordUpdated(
      token?: null,
      baseToken?: null,
      lpToken?: null,
      _active?: null
    ): TypedEventFilter<
      [string, string, string, boolean],
      { token: string; baseToken: string; lpToken: string; _active: boolean }
    >;

    "V1PriceOracleUpdated(address,address)"(
      oldAddress?: null,
      newAddress?: null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;

    V1PriceOracleUpdated(
      oldAddress?: null,
      newAddress?: null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;
  };

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    aggregators(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    assetPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getPriceFromChainlink(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceFromDex(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPriceFromOracle(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPrice(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPriceOracle(overrides?: CallOverrides): Promise<BigNumber>;

    priceRecords(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAggregators(
      tokenAddresses: string[],
      sources: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDexPriceInfo(
      _token: string,
      _baseToken: string,
      _lpToken: string,
      _active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDirectPrice(
      _token: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setV1PriceOracle(
      _v1PriceOracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    v1PriceOracle(overrides?: CallOverrides): Promise<BigNumber>;

    wrapped(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    aggregators(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    assetPrices(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPriceFromChainlink(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPriceFromDex(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPriceFromOracle(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenPrice(
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPriceOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceRecords(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAggregators(
      tokenAddresses: string[],
      sources: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDexPriceInfo(
      _token: string,
      _baseToken: string,
      _lpToken: string,
      _active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDirectPrice(
      _token: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setV1PriceOracle(
      _v1PriceOracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    v1PriceOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wrapped(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}