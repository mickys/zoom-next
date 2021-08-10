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


import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");

async function init() {

    // 0xAe071C9b3Eb3942160AE6bCA650683518F70127F 0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb

    const ECNFT         = new ethers.Contract("0xAAD4475343f5150E33d6194270f04e7e5968A2f8", ECNFTArtifacts.abi, ethersProvider);
    const ECAuction     = new ethers.Contract("0xB57fba975C89492B016e0215E819B4d489F0fbcD", ECAuctionArtifacts.abi, ethersProvider);
    const ECRegistry     = new ethers.Contract("0xc7c27535f81C6c15Ee2648fEe00D0831FE071891", ECRegistryV2Artifacts.abi, ethersProvider);

    const ZoomContractInstance = new ethers.Contract("0xC878B3C422BeECB879dE0a2bea01D30C88F0ccdc", ZoomArtifacts.abi, ethersProvider);

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
        const tokenUriCall = ZoomLibraryInstance.addType4Call(
            ECNFT,
            ["tokenURI(uint256)", [i]],
            "tokenURI(uint256) returns (string)" 
        )
        item_identifiers.push(tokenUriCall);
        callNum++;

        // Load onChainTraits for trait as well :D
        const traitsCall = ZoomLibraryInstance.addType4Call(
            ECRegistry,
            ["getTokenData(uint16)", [i]],
            "getTokenData(uint16) returns (uint8[])" 
        )
        item_identifiers.push(traitsCall);
        callNum++;

    }
    // console.log("callNum", callNum);
    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    // console.log( "binary:" );
    // ZoomLibraryInstance.binary.forEach(item => {
    //     console.log(item.toString("hex"));
    // })

    console.log("======== ZOOM CALL START ============" );
    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );

    console.timeEnd('zoomCall')
    console.log("======== ZOOM CALL END ==============" );

    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS ===============" );

    for(let i = 0; i < callNum; i++) {
        let traitData = ZoomLibraryInstance.decodeCall(item_identifiers[i]);
        traits.push(traitData);
    }

    console.log("======== ZOOM RESULTS END ===========" );

    console.log(traits);
}

init();