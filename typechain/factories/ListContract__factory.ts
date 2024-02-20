/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ListContract, ListContractInterface } from "../ListContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "EventNewChildItem",
    type: "event",
  },
  {
    inputs: [],
    name: "addDummyRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_childId",
        type: "uint256",
      },
    ],
    name: "delistChild",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_childId",
        type: "uint256",
      },
    ],
    name: "getChildStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "itemNum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "items",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "itemAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "managerAddress",
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
];

const _bytecode =
  "0x6080604052600060025534801561001557600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611fba806100656000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806392e75d511161005b57806392e75d51146101ab578063bfb231d2146101d9578063cf73a1bc146102ad578063eaf2a5ef146102e15761007d565b806309958e4c146100825780634b600062146100c65780635386c695146100d0575b600080fd5b6100ae6004803603602081101561009857600080fd5b81019080803590602001909291905050506102ff565b60405180821515815260200191505060405180910390f35b6100ce610453565b005b6101a9600480360360408110156100e657600080fd5b810190808035906020019064010000000081111561010357600080fd5b82018360208201111561011557600080fd5b8035906020019184600183028401116401000000008311171561013757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106d5565b005b6101d7600480360360208110156101c157600080fd5b8101908080359060200190929190505050610908565b005b610205600480360360208110156101ef57600080fd5b8101908080359060200190929190505050610a34565b60405180806020018573ffffffffffffffffffffffffffffffffffffffff1681526020018415158152602001838152602001828103825286818151815260200191508051906020019080838360005b8381101561026f578082015181840152602081019050610254565b50505050905090810190601f16801561029c5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b6102b5610b29565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102e9610b4d565b6040518082815260200191505060405180910390f35b6000610309610e66565b60016000848152602001908152602001600020604051806080016040529081600082018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b505050505081526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1615151515815260200160028201548152505090508060400151915050919050565b600060019050600060016002540190506000828201905060008290505b818110156106cf5760006104b96040518060400160405280600a81526020017f4974656d204e616d65200000000000000000000000000000000000000000000081525083610b53565b6104c283610d69565b6040516104ce90610ea6565b80806020018373ffffffffffffffffffffffffffffffffffffffff168152602001828103825284818151815260200191508051906020019080838360005b8381101561052757808201518184015260208101905061050c565b50505050905090810190601f1680156105545780820380516001836020036101000a031916815260200191505b509350505050604051809103906000f080158015610576573d6000803e3d6000fd5b5090506106c18173ffffffffffffffffffffffffffffffffffffffff166317d7de7c6040518163ffffffff1660e01b815260040160006040518083038186803b1580156105c257600080fd5b505afa1580156105d6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250602081101561060057600080fd5b810190808051604051939291908464010000000082111561062057600080fd5b8382019150602082018581111561063657600080fd5b825186600182028301116401000000008211171561065357600080fd5b8083526020830192505050908051906020019080838360005b8381101561068757808201518184015260208101905061066c565b50505050905090810190601f1680156106b45780820380516001836020036101000a031916815260200191505b50604052505050826106d5565b508080600101915050610470565b50505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610796576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f53656e646572206d757374206265206d616e616765722061646472657373000081525060200191505060405180910390fd5b60006001600060026000815460010191905081905581526020019081526020016000209050828160000190805190602001906107d3929190610eb4565b50818160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018160010160146101000a81548160ff02191690831515021790555060025481600201819055507f23edf714647c793a4cd466e26b25f4c3aad8f5923d416204fa0707b3af7bcd5c838360025460405180806020018473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156108c75780820151818401526020810190506108ac565b50505050905090810190601f1680156108f45780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a1505050565b600115156001600083815260200190815260200160002060010160149054906101000a900460ff16151514801561098a575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6109fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f4974656d206e6565647320746f2068617665207374617475732074727565000081525060200191505060405180910390fd5b600060016000838152602001908152602001600020905060008160010160146101000a81548160ff0219169083151502179055505050565b6001602052806000526040600020600091509050806000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ae05780601f10610ab557610100808354040283529160200191610ae0565b820191906000526020600020905b815481529060010190602001808311610ac357829003601f168201915b5050505050908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060020154905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b606060006064905060608167ffffffffffffffff81118015610b7457600080fd5b506040519080825280601f01601f191660200182016040528015610ba75781602001600182028036833780820191505090505b5090506000808590505b60008114610c23576000600a8281610bc557fe5b069050600a8281610bd257fe5b0491508060300160f81b848480600101955081518110610bee57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535050610bb1565b606087905060608382510167ffffffffffffffff81118015610c4457600080fd5b506040519080825280601f01601f191660200182016040528015610c775781602001600182028036833780820191505090505b50905060005b8251811015610ce557828181518110610c9257fe5b602001015160f81c60f81b828281518110610ca957fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610c7d565b600090505b84811015610d59578581600187030381518110610d0357fe5b602001015160f81c60f81b828451830181518110610d1d57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610cea565b8197505050505050505092915050565b60006060601467ffffffffffffffff81118015610d8557600080fd5b506040519080825280601f01601f191660200182016040528015610db85781602001600182028036833780820191505090505b50905060005b6013811015610ddb57600081602084010153600181019050610dbe565b50826013602083010153610dee81610df6565b915050919050565b600080600090506000600184510390505b6000600182011115610e5c576000848281518110610e2157fe5b602001015160f81c60f81b60f81c60ff16905060006002600184885103030260100a8202905080840193505050808060019003915050610e07565b5080915050919050565b604051806080016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600015158152602001600081525090565b6110258062000f6083390190565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282610eea5760008555610f31565b82601f10610f0357805160ff1916838001178555610f31565b82800160010185558215610f31579182015b82811115610f30578251825591602001919060010190610f15565b5b509050610f3e9190610f42565b5090565b5b80821115610f5b576000816000905550600101610f43565b509056fe60806040523480156200001157600080fd5b506040516200102538038062001025833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b506040526020018051906020019092919050505081600090805190602001906200011d92919062000167565b5080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200021d565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200019f5760008555620001eb565b82601f10620001ba57805160ff1916838001178555620001eb565b82800160010185558215620001eb579182015b82811115620001ea578251825591602001919060010190620001cd565b5b509050620001fa9190620001fe565b5090565b5b8082111562000219576000816000905550600101620001ff565b5090565b610df8806200022d6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063475a7bf1116100b8578063688959791161007c57806368895979146108e25780637991369914610900578063c3334ff814610931578063c7c655de14610953578063d0369b3f146109d6578063db14c800146109f657610137565b8063475a7bf11461075c57806354e17632146107df57806356e1b15c146108035780635c222bad1461082b5780635f0c9a6b1461085f57610137565b8063343a875d116100ff578063343a875d1461054557806338cc483114610566578063434a98d81461059a578063446fd9f01461070c57806344d423d51461073c57610137565b80630bcd3b331461013c57806317d7de7c146101bf5780631cf61bdc146102425780631f903037146102c557806327285d5d146102e3575b600080fd5b610144610a2f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610184578082015181840152602081019050610169565b50505050905090810190601f1680156101b15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c7610ab7565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102075780820151818401526020810190506101ec565b50505050905090810190601f1680156102345780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61024a610b59565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561028a57808201518184015260208101905061026f565b50505050905090810190601f1680156102b75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102cd610b79565b6040518082815260200191505060405180910390f35b6104ca600480360360608110156102f957600080fd5b810190808035906020019064010000000081111561031657600080fd5b82018360208201111561032857600080fd5b8035906020019184600183028401116401000000008311171561034a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156103ad57600080fd5b8201836020820111156103bf57600080fd5b803590602001918460018302840111640100000000831117156103e157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561044457600080fd5b82018360208201111561045657600080fd5b8035906020019184600183028401116401000000008311171561047857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610ba4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561050a5780820151818401526020810190506104ef565b50505050905090810190601f1680156105375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61054d610bd4565b604051808260ff16815260200191505060405180910390f35b61056e610bdd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610691600480360360808110156105b057600080fd5b81019080803560ff169060200190929190803515159060200190929190803590602001906401000000008111156105e657600080fd5b8201836020820111156105f857600080fd5b8035906020019184600183028401116401000000008311171561061a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803577ffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610be6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106d15780820151818401526020810190506106b6565b50505050905090810190601f1680156106fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610714610bff565b60405180826fffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610744610c17565b60405180821515815260200191505060405180910390f35b610764610c20565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156107a4578082015181840152602081019050610789565b50505050905090810190601f1680156107d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107e7610c5d565b604051808263ffffffff16815260200191505060405180910390f35b61080b610c69565b604051808267ffffffffffffffff16815260200191505060405180910390f35b610833610c79565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610867610ca3565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108a757808201518184015260208101905061088c565b50505050905090810190601f1680156108d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6108ea610ce0565b6040518082815260200191505060405180910390f35b610908610d08565b60405180826fffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b610939610d23565b604051808261ffff16815260200191505060405180910390f35b61095b610d2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561099b578082015181840152602081019050610980565b50505050905090810190601f1680156109c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6109de610d6a565b60405180821515815260200191505060405180910390f35b6109fe610d6f565b604051808277ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b606080600167ffffffffffffffff81118015610a4a57600080fd5b506040519080825280601f01601f191660200182016040528015610a7d5781602001600182028036833780820191505090505b509050604080825260005b60208204811015610aaa57600b60208202602085010152600181019050610a88565b5059604052508091505090565b606060008054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b4f5780601f10610b2457610100808354040283529160200191610b4f565b820191906000526020600020905b815481529060010190602001808311610b3257829003601f168201915b5050505050905090565b6060604051806060016040528060408152602001610d8360409139905090565b60007f0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f2060001b905090565b60606040518060200160405280600081525092506040518060200160405280600081525091508390509392505050565b600060ff905090565b60006001905090565b6060600094506000935060009150829050949350505050565b60006fffffffffffffffffffffffffffffffff905090565b60006001905090565b60606040518060400160405280600881526020017f3132333435363738000000000000000000000000000000000000000000000000815250905090565b600063ffffffff905090565b600067ffffffffffffffff905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606040518060400160405280602081526020017f3132333435363738313233343536373831323334353637383132333435363738815250905090565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905090565b60006f0102030405060708010203040506070860801b905090565b600061ffff905090565b60606040518060400160405280601081526020017f3132333435363738313233343536373800000000000000000000000000000000815250905090565b600090565b600067010203040506070860c01b90509056fe31323334353637383132333435363738313233343536373831323334353637383132333435363738313233343536373831323334353637383132333435363738a264697066735822122070d3d5a3267bf01f10a9862e221d3281fd3fb344e6bad19f122be8ad2f351fb964736f6c63430007050033a26469706673582212204ac5eca177b2de4aa7ec84431b984de28516b52665b23f5d84abca855ecccabf64736f6c63430007050033";

export class ListContract__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ListContract> {
    return super.deploy(overrides || {}) as Promise<ListContract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ListContract {
    return super.attach(address) as ListContract;
  }
  connect(signer: Signer): ListContract__factory {
    return super.connect(signer) as ListContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ListContractInterface {
    return new utils.Interface(_abi) as ListContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ListContract {
    return new Contract(address, _abi, signerOrProvider) as ListContract;
  }
}
