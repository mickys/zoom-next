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
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ListContractInterface extends ethers.utils.Interface {
  functions: {
    "addDummyRecord()": FunctionFragment;
    "addItem(string,address)": FunctionFragment;
    "delistChild(uint256)": FunctionFragment;
    "getChildStatus(uint256)": FunctionFragment;
    "itemNum()": FunctionFragment;
    "items(uint256)": FunctionFragment;
    "managerAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addDummyRecord",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addItem",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "delistChild",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getChildStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "itemNum", values?: undefined): string;
  encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "managerAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addDummyRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delistChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChildStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "itemNum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "managerAddress",
    data: BytesLike
  ): Result;

  events: {
    "EventNewChildItem(string,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EventNewChildItem"): EventFragment;
}

export class ListContract extends BaseContract {
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

  interface: ListContractInterface;

  functions: {
    addDummyRecord(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addItem(
      _name: string,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    delistChild(
      _childId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getChildStatus(
      _childId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    itemNum(overrides?: CallOverrides): Promise<[BigNumber]>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, boolean, BigNumber] & {
        name: string;
        itemAddress: string;
        status: boolean;
        index: BigNumber;
      }
    >;

    managerAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  addDummyRecord(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addItem(
    _name: string,
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  delistChild(
    _childId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getChildStatus(
    _childId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  itemNum(overrides?: CallOverrides): Promise<BigNumber>;

  items(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, boolean, BigNumber] & {
      name: string;
      itemAddress: string;
      status: boolean;
      index: BigNumber;
    }
  >;

  managerAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addDummyRecord(overrides?: CallOverrides): Promise<void>;

    addItem(
      _name: string,
      _address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    delistChild(
      _childId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getChildStatus(
      _childId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    itemNum(overrides?: CallOverrides): Promise<BigNumber>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, boolean, BigNumber] & {
        name: string;
        itemAddress: string;
        status: boolean;
        index: BigNumber;
      }
    >;

    managerAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    EventNewChildItem(
      _name?: null,
      _address?: null,
      _index?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _name: string; _address: string; _index: BigNumber }
    >;
  };

  estimateGas: {
    addDummyRecord(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addItem(
      _name: string,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    delistChild(
      _childId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getChildStatus(
      _childId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    itemNum(overrides?: CallOverrides): Promise<BigNumber>;

    items(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    managerAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addDummyRecord(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addItem(
      _name: string,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    delistChild(
      _childId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getChildStatus(
      _childId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    itemNum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    managerAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
