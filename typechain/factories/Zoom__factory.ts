/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Zoom, ZoomInterface } from "../Zoom";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "inputData",
        type: "bytes",
      },
    ],
    name: "combine",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103bd806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063124542e314610030575b600080fd5b6100e96004803603602081101561004657600080fd5b810190808035906020019064010000000081111561006357600080fd5b82018360208201111561007557600080fd5b8035906020019184600183028401116401000000008311171561009757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506101d0565b604051808060200180602001838103835285818151815260200191508051906020019080838360005b8381101561012d578082015181840152602081019050610112565b50505050905090810190601f16801561015a5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015610193578082015181840152602081019050610178565b50505050905090810190601f1680156101c05780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b606080606080606060208601600381015160001a610100600283015160001a020159604052604051945060408102855260005b6002820281101561022557600060208202602088010152600181019050610203565b5059604052604051935060208102845260005b8181101561025757600060208202602087010152600181019050610238565b5060068201915059604052602060405101925060006020840160005b8381101561036a57600285015160001a610100600187015160001a020160008052855160001a600281146102c457600887019650600160146101000a03600c88035116600052601487019650610316565b600487015160001a610100600389015160001a02016040810260208c0101600689015160001a61010060058b015160001a0201600160146101000a03600c8284510103511660005260088a0199505050505b506000516000808389846207a120fa3d6000863e846040850260208d0101523d6040850260408d01015282880197503d850194503d860195503d86036020850260208c010152505050600181019050610273565b50818552602081016040525050505080829450945050505091509156fea2646970667358221220ec2819dd88a20e28333a40385f16d5ad825eea881e5a9d7078213d0d87f4560964736f6c63430007050033";

export class Zoom__factory extends ContractFactory {
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
  ): Promise<Zoom> {
    return super.deploy(overrides || {}) as Promise<Zoom>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Zoom {
    return super.attach(address) as Zoom;
  }
  connect(signer: Signer): Zoom__factory {
    return super.connect(signer) as Zoom__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZoomInterface {
    return new utils.Interface(_abi) as ZoomInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Zoom {
    return new Contract(address, _abi, signerOrProvider) as Zoom;
  }
}
