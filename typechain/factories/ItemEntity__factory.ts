/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ItemEntity, ItemEntityInterface } from "../ItemEntity";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBoolFalse",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getBoolTrue",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getBytes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getBytes16",
    outputs: [
      {
        internalType: "bytes16",
        name: "",
        type: "bytes16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getBytes8",
    outputs: [
      {
        internalType: "bytes8",
        name: "",
        type: "bytes8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getString16",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getString32",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getString64",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getString8",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint128",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint16",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint256",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint32",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint64",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getUint8",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "numVar",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "boolVar",
        type: "bool",
      },
      {
        internalType: "string",
        name: "stringVar",
        type: "string",
      },
      {
        internalType: "bytes8",
        name: "bytesVar",
        type: "bytes8",
      },
    ],
    name: "multipleOne",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "one",
        type: "string",
      },
      {
        internalType: "string",
        name: "two",
        type: "string",
      },
      {
        internalType: "string",
        name: "three",
        type: "string",
      },
    ],
    name: "multipleTwo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200102538038062001025833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b506040526020018051906020019092919050505081600090805190602001906200011d92919062000167565b5080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200021d565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200019f5760008555620001eb565b82601f10620001ba57805160ff1916838001178555620001eb565b82800160010185558215620001eb579182015b82811115620001ea578251825591602001919060010190620001cd565b5b509050620001fa9190620001fe565b5090565b5b8082111562000219576000816000905550600101620001ff565b5090565b610df8806200022d6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063475a7bf1116100b8578063688959791161007c57806368895979146108e25780637991369914610900578063c3334ff814610931578063c7c655de14610953578063d0369b3f146109d6578063db14c800146109f657610137565b8063475a7bf11461075c57806354e17632146107df57806356e1b15c146108035780635c222bad1461082b5780635f0c9a6b1461085f57610137565b8063343a875d116100ff578063343a875d1461054557806338cc483114610566578063434a98d81461059a578063446fd9f01461070c57806344d423d51461073c57610137565b80630bcd3b331461013c57806317d7de7c146101bf5780631cf61bdc146102425780631f903037146102c557806327285d5d146102e3575b600080fd5b610144610a2f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610184578082015181840152602081019050610169565b50505050905090810190601f1680156101b15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c7610ab7565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102075780820151818401526020810190506101ec565b50505050905090810190601f1680156102345780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61024a610b59565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561028a57808201518184015260208101905061026f565b50505050905090810190601f1680156102b75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102cd610b79565b6040518082815260200191505060405180910390f35b6104ca600480360360608110156102f957600080fd5b810190808035906020019064010000000081111561031657600080fd5b82018360208201111561032857600080fd5b8035906020019184600183028401116401000000008311171561034a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156103ad57600080fd5b8201836020820111156103bf57600080fd5b803590602001918460018302840111640100000000831117156103e157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561044457600080fd5b82018360208201111561045657600080fd5b8035906020019184600183028401116401000000008311171561047857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610ba4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561050a5780820151818401526020810190506104ef565b50505050905090810190601f1680156105375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61054d610bd4565b604051808260ff16815260200191505060405180910390f35b61056e610bdd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610691600480360360808110156105b057600080fd5b81019080803560ff169060200190929190803515159060200190929190803590602001906401000000008111156105e657600080fd5b8201836020820111156105f857600080fd5b8035906020019184600183028401116401000000008311171561061a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803577ffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610be6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106d15780820151818401526020810190506106b6565b50505050905090810190601f1680156106fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610714610bff565b60405180826fffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610744610c17565b60405180821515815260200191505060405180910390f35b610764610c20565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156107a4578082015181840152602081019050610789565b50505050905090810190601f1680156107d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107e7610c5d565b604051808263ffffffff16815260200191505060405180910390f35b61080b610c69565b604051808267ffffffffffffffff16815260200191505060405180910390f35b610833610c79565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610867610ca3565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108a757808201518184015260208101905061088c565b50505050905090810190601f1680156108d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6108ea610ce0565b6040518082815260200191505060405180910390f35b610908610d08565b60405180826fffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b610939610d23565b604051808261ffff16815260200191505060405180910390f35b61095b610d2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561099b578082015181840152602081019050610980565b50505050905090810190601f1680156109c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6109de610d6a565b60405180821515815260200191505060405180910390f35b6109fe610d6f565b604051808277ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b606080600167ffffffffffffffff81118015610a4a57600080fd5b506040519080825280601f01601f191660200182016040528015610a7d5781602001600182028036833780820191505090505b509050604080825260005b60208204811015610aaa57600b60208202602085010152600181019050610a88565b5059604052508091505090565b606060008054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b4f5780601f10610b2457610100808354040283529160200191610b4f565b820191906000526020600020905b815481529060010190602001808311610b3257829003601f168201915b5050505050905090565b6060604051806060016040528060408152602001610d8360409139905090565b60007f0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f2060001b905090565b60606040518060200160405280600081525092506040518060200160405280600081525091508390509392505050565b600060ff905090565b60006001905090565b6060600094506000935060009150829050949350505050565b60006fffffffffffffffffffffffffffffffff905090565b60006001905090565b60606040518060400160405280600881526020017f3132333435363738000000000000000000000000000000000000000000000000815250905090565b600063ffffffff905090565b600067ffffffffffffffff905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606040518060400160405280602081526020017f3132333435363738313233343536373831323334353637383132333435363738815250905090565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905090565b60006f0102030405060708010203040506070860801b905090565b600061ffff905090565b60606040518060400160405280601081526020017f3132333435363738313233343536373800000000000000000000000000000000815250905090565b600090565b600067010203040506070860c01b90509056fe31323334353637383132333435363738313233343536373831323334353637383132333435363738313233343536373831323334353637383132333435363738a264697066735822122070d3d5a3267bf01f10a9862e221d3281fd3fb344e6bad19f122be8ad2f351fb964736f6c63430007050033";

export class ItemEntity__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _name: string,
    _addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ItemEntity> {
    return super.deploy(_name, _addr, overrides || {}) as Promise<ItemEntity>;
  }
  getDeployTransaction(
    _name: string,
    _addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _addr, overrides || {});
  }
  attach(address: string): ItemEntity {
    return super.attach(address) as ItemEntity;
  }
  connect(signer: Signer): ItemEntity__factory {
    return super.connect(signer) as ItemEntity__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ItemEntityInterface {
    return new utils.Interface(_abi) as ItemEntityInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ItemEntity {
    return new Contract(address, _abi, signerOrProvider) as ItemEntity;
  }
}
