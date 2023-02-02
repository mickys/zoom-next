/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import { Zoom } from "../src/index";
import {ethers} from 'ethers';

import ERC721Artifacts from './artifacts/Limited721.json';
import TraitRegistryArtifacts from './artifacts/TraitRegistry.json';
import ImplementerUint8Artifacts from './artifacts/ImplementerUint8.json';
import ImplementerUint256Artifacts from './artifacts/ImplementerUint256.json';


import { BitArray, Registry } from "@ethercards/ec-util";


import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://goerli.nowlive.ro/");

async function init() {

    // 0xAe071C9b3Eb3942160AE6bCA650683518F70127F 0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb

    const address = "0x0f970a2a396bc779ec18ce05253a18728f2e4b63";
    const TraitRegistryAddress = "0xFb186901FE74406Da6aa557495B6296b44f16546";
    const TokenAddr = "0x9fd3154c9a50edfa5c0b8b67e4d9dfdd470f1969";
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const ActivatedTraitImplementerAddress = "0x46952565c2b23464D290F04f977df04AB6b51ED3";


    const ERC721            = new ethers.Contract(TokenAddr, ERC721Artifacts.abi, ethersProvider);
    const TraitRegistry     = new ethers.Contract(TraitRegistryAddress, TraitRegistryArtifacts, ethersProvider);
    const ActivatedTraitImplementer     = new ethers.Contract(ActivatedTraitImplementerAddress, ImplementerUint8Artifacts, ethersProvider);

    const maxNumberOfTraitsToLoad = 20;

    const ZoomContractInstance = new ethers.Contract("0xB93b9e69E5Cb510796Da52Df92860a9E62e678Ae", ZoomArtifacts.abi, ethersProvider);


    console.log("========== ZOOM SETUP CALL 1 ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    let setupCallNum = 0;
    let traits: any = [];
    const setupItem_identifiers: any = [];

    const balanceOfCall = ZoomLibraryInstance.addCall(
        ERC721,
        ["balanceOf(address)", [address]],
        "balanceOf(address) returns (uint256)" 
    )
    setupItem_identifiers.push(balanceOfCall);
    setupCallNum++;

    const getTraitsCall = ZoomLibraryInstance.addCall(
        TraitRegistry,
        ["getTraits()", []],
 //       "getTraits() returns (traitStruct[] memory)" 
        "getTraits() returns ((uint16,uint8,uint16,uint16,address,bool,string)[] memory)" 

    )
    setupItem_identifiers.push(getTraitsCall);
    setupCallNum++;
    
    console.log("callNum", setupCallNum);
    let ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    console.log("======== ZOOM CALL START CALL 1 ============" );
    console.time('zoomCall')

    let combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );
    console.timeEnd('zoomCall')

    const SetupGasCostEstimate = await ZoomContractInstance.estimateGas.combine( ZoomQueryBinary );
    console.log("Setup gasEstimate:", SetupGasCostEstimate.toNumber());

    console.log("======== ZOOM CALL END CALL 1 ==============" );

    let newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS CALL 1 ===============" );

    const ownedNumberOfTokens = ZoomLibraryInstance.decodeCall(setupItem_identifiers[0]).toString();

    traits = ZoomLibraryInstance.decodeCall(setupItem_identifiers[1])[0];
    const existingTraitCount = traits.length;

    // console.log("traits", traits);
    console.log("existingTraitCount", existingTraitCount);
    console.log("ownedNumberOfTokens", ownedNumberOfTokens);

    let callNum = 0;
    let item_identifiers: any = [];

    // trait types
    // internal 0 for normal, 1 for inverted, 2 for inverted range,
    // external 3 uint8 values, 4 uint256 values, 5 bytes32, 6 string 
    // external 7 uint8 custom logic

    // initialize trait implementer contracts
    const traitImplementerArtifacts: any = [];
    traitImplementerArtifacts[3] = ImplementerUint8Artifacts;
    traitImplementerArtifacts[4] = ImplementerUint256Artifacts;
    traitImplementerArtifacts[7] = ImplementerUint8Artifacts;

    const traitImplementerMethodReturn: any = [];
    traitImplementerMethodReturn[3] = "getValue(uint16) returns (uint8)";
    traitImplementerMethodReturn[4] = "getValue(uint16) returns (uint256)";
    traitImplementerMethodReturn[7] = "getValue(uint16) returns (uint8)";


    const traitImplementers: any = [];
    const traitValueZoomMap: any = [];

    for(let i = 0; i < traits.length; i++) {
        if(traits[i].implementer != ZERO_ADDRESS) {
            traitImplementers[i] = new ethers.Contract(traits[i].implementer, traitImplementerArtifacts[traits[i].traitType], ethersProvider);

            // console.log("interface", i, traitImplementers[i].interface);
            traitValueZoomMap.push( 
                { contract: traitImplementers[i], mapAndParams: ["getValue(uint16)", [i]] }
            )
        }
    }

    for(let i = 0; i < ownedNumberOfTokens; i++) {
                
        // request the token ID
        const tokenIdCall = ZoomLibraryInstance.addMappingCountCall(
            // the contract we're calling
            ERC721,
            // the method that is returing our ID
            ["tokenOfOwnerByIndex", [address, i]],
            // signature used to decode the result
            "tokenOfOwnerByIndex(address,uint256) returns (uint256)",
            // array of next method calls that will use the result of this current call
            [
                { contract: ERC721, mapAndParams: ["tokenURI(uint256)", [i]] },
                { contract: TraitRegistry, mapAndParams: ["getTokenData(uint16)", [i]] },
                ... traitValueZoomMap
            ]
        );
        item_identifiers.push(tokenIdCall);
        callNum++;
        
        const tokenUriCall = ZoomLibraryInstance.addResultReferenceCall(
            ERC721,
            ["tokenURI(uint256)", [i]],
            0,
            "tokenURI(uint256) returns (string)" 
        )

        item_identifiers.push(tokenUriCall);
        callNum++;

        const traitsCall = ZoomLibraryInstance.addResultReferenceCall(
            TraitRegistry,
            ["getTokenData(uint16)", [i]],
            0,
            "getTokenData(uint16) returns (uint8[])" 
        )

        item_identifiers.push(traitsCall);
        callNum++;



        for(let l = 0; l < traits.length; l++) {
            if(traits[l].implementer != ZERO_ADDRESS) {
                const traitValueCall = ZoomLibraryInstance.addResultReferenceCall(
                    traitImplementers[l],
                    ["getValue(uint16)", [l]],
                    0,
                    traitImplementerMethodReturn[traits[l].traitType]
                )
                item_identifiers.push(traitValueCall);
                callNum++;
            }
        }


    }
    console.log("callNum", callNum);
    ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();


    console.log("======== ZOOM CALL START CALL 2 ============" );
    console.time('zoomCall')
    // console.log("ZoomQueryBinary", ZoomQueryBinary.toString("hex"));
    combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );
    // console.log("combinedResult", combinedResult);

    // return;

    console.timeEnd('zoomCall')

    const LoadGasCostEstimate = await ZoomContractInstance.estimateGas.combine( ZoomQueryBinary );
    console.log("Load gasEstimate:", LoadGasCostEstimate.toNumber());

    console.log("======== ZOOM CALL END CALL 2 ==============" );

    // console.log("callResult", combinedResult);

    newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS CALL 2 ===============" );

    // console.log("newDataCache", newDataCache);
    const tokens: any = [];
    const registry = new Registry();

    // since we're doing 3 calls per token increment by 3
    const loopValue = 3 + traitValueZoomMap.length;
    // const loopValue = 3;
    for(let i = 0; i < callNum; i = i + loopValue) {

        const tokenId = ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString();
        const tokenURI = ZoomLibraryInstance.decodeCall(item_identifiers[i+1]).toString();
        const traitData = ZoomLibraryInstance.decodeCall(item_identifiers[i+2]);
        const decodedTraits = BitArray.fromUint8Array((traitData[0])).toKeyValue();
        const myTraits: any = [];
        
        let traitDecodedCount = i+3;
        for(let l = 0; l < traits.length; l++) {
            // console.log("Decode trait", l, traits[l].implementer, traits[l].traitType, traits[l].name, traitDecodedCount );
            if(traits[l].implementer != ZERO_ADDRESS) {
                myTraits[l] = {
                    id: l,
                    value: ZoomLibraryInstance.decodeCall(item_identifiers[traitDecodedCount])[0]
                } 
                traitDecodedCount++;
            } else {
                myTraits[l] = {
                    id: l,
                    value: decodedTraits[l]
                } 
            }
        }

        tokens.push({
            "id": tokenId,
            "uri": tokenURI,
            "traits": myTraits
        });
    }

    console.log("======== ZOOM RESULTS END ===========" );


    for(let i = 0; i < tokens.length; i++) {
        console.log("id", tokens[i].id, tokens[i].uri, tokens[i].traits);
    }


    console.log("======== REPORT ===========" );
    console.log("Setup GasCost:        ", SetupGasCostEstimate.toNumber());
    console.log("Load GasCost:         ", LoadGasCostEstimate.toNumber());
    console.log("Trait Count:          ", existingTraitCount);
    console.log("Address NFT Balance:  ", ownedNumberOfTokens);


}

init();