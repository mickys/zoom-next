/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import { Zoom } from "../src/index";
import {ethers} from 'ethers';

import ECNFTArtifacts from './artifacts/ECNFT.json';
import ECAuctionArtifacts from './artifacts/ECAuction.json';
import ECRegistryV2Artifacts from './artifacts/ECRegistryV2.json';

import { BitArray, Registry } from "@ethercards/ec-util";


import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");

async function init() {

    // 0xAe071C9b3Eb3942160AE6bCA650683518F70127F 0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb

    const ECNFT         = new ethers.Contract("0xAAD4475343f5150E33d6194270f04e7e5968A2f8", ECNFTArtifacts.abi, ethersProvider);
    const ECAuction     = new ethers.Contract("0xB57fba975C89492B016e0215E819B4d489F0fbcD", ECAuctionArtifacts.abi, ethersProvider);
    const ECRegistry     = new ethers.Contract("0xc7c27535f81C6c15Ee2648fEe00D0831FE071891", ECRegistryV2Artifacts.abi, ethersProvider);

    const ZoomContractInstance = new ethers.Contract("0x491592F30D9a3d1887F486eA2A3c72ad82fAcF4D", ZoomArtifacts.abi, ethersProvider);

    const address = "0x51eD19819B5a960B4B3aDfeDEedCeCaB51953010";

    console.log("========== ZOOM SETUP ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    let callNum = 0;
    let traits = [];

    const existingTraitCount = await ECRegistry.traitCount();
    // console.log("existingTraitCount", existingTraitCount);

    const ownedNumberOfTokens = await ECNFT.balanceOf(address);
    // console.log("ownedNumberOfTokens", ownedNumberOfTokens.toNumber());

    const item_identifiers = [];
    for(let i = 0; i < ownedNumberOfTokens; i++) {
                
        // request the token ID
        const tokenIdCall = ZoomLibraryInstance.addMappingCountCall(
            // the contract we're calling
            ECNFT,
            // the method that is returing our ID
            ["tokenOfOwnerByIndex", [address, i]],
            // signature used to decode the result
            "tokenOfOwnerByIndex(address,uint256) returns (uint256)",
            // array of next method calls that will use the result of this current call
            [
                { contract: ECNFT, mapAndParams: ["tokenURI(uint256)", [i]] },
                { contract: ECRegistry, mapAndParams: ["getTokenData(uint16)", [i]] },
            ]
        );
        item_identifiers.push(tokenIdCall);
        callNum++;

        // request the token URI
        const tokenUriCall = ZoomLibraryInstance.addType5Call(
            ECNFT,
            ["tokenURI(uint256)", [i]],
            "tokenURI(uint256) returns (string)" 
        )
        item_identifiers.push(tokenUriCall);
        callNum++;

        // Load onChainTraits for trait as well :D
        const traitsCall = ZoomLibraryInstance.addType5Call(
            ECRegistry,
            ["getTokenData(uint16)", [i]],
            "getTokenData(uint16) returns (uint8[])" 
        )
        item_identifiers.push(traitsCall);
        callNum++;


    }
    // console.log("callNum", callNum);
    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    // // console.log( "binary:" );
    // ZoomLibraryInstance.binary.forEach(item => {
    //     console.log(item.toString("hex"));
    // })

    console.log("======== ZOOM CALL START ============" );
    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );

    console.timeEnd('zoomCall')
    console.log("======== ZOOM CALL END ==============" );

    // console.log("callResult", combinedResult);

    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS ===============" );

    // console.log("newDataCache", newDataCache);
    const tokens = [];
    const registry = new Registry();

    // since we're doing 3 calls per token increment by 3
    for(let i = 0; i < callNum; i = i+3) {
        const tokenId = ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString();
        const tokenURI = ZoomLibraryInstance.decodeCall(item_identifiers[i+1]).toString();
        const tokenURI2 = ZoomLibraryInstance.decodeCall(item_identifiers[i+2]).toString();
        // const traitData = ZoomLibraryInstance.decodeCall(item_identifiers[i+2]);
        // const tokenURI = "";

        // exclude creator cards
        if(tokenId > 9) {
            // const decodedTraits = registry.decodeTraits(traitData[0]);
            tokens.push({
                "id": tokenId,
                "uri": tokenURI,
                "uri2": tokenURI2,
                // "traitData": traitData,
                // "traits": decodedTraits
            });
        }
    }


    console.log("======== ZOOM RESULTS END ===========" );


    for(let i = 0; i < tokens.length; i++) {
        const tokenData = await ECRegistry.getTokenData(tokens[i].id);
        // console.log("id", tokens[i].id, "uri", tokens[i].uri, "traitData", tokens[i].traitData[0].join(","), "chainData", tokenData.join(","));

        console.log("id", tokens[i].id, "uri", tokens[i].uri, "uri2", tokens[i].uri2, tokenData.join(","));
    }
}

init();