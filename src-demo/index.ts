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

import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");

async function init() {

    // 0xAe071C9b3Eb3942160AE6bCA650683518F70127F 0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb

    const ECNFT         = new ethers.Contract("0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb", ECNFTArtifacts.abi, ethersProvider);
    const ECAuction     = new ethers.Contract("0xB57fba975C89492B016e0215E819B4d489F0fbcD", ECAuctionArtifacts.abi, ethersProvider);
    const MappedStructs     = new ethers.Contract("0x95CB80219eE2Dc4bd4839EF8Dd8Fe5C0bbD3f4bc", MappedStructsArtifacts.abi, ethersProvider);
    const MappedStructsTwo  = new ethers.Contract("0x1F2591f095408BB690D2054b778DdE4FD69f4438", MappedStructsArtifacts.abi, ethersProvider);

    const ZoomContractInstance = new ethers.Contract("0xC878B3C422BeECB879dE0a2bea01D30C88F0ccdc", ZoomArtifacts.abi, ethersProvider);

    console.log("========== ZOOM SETUP ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    // setup calls

    const expectedResultCount = 15;

    // The propery holding the mapping count
    const itemCount_identifier = ZoomLibraryInstance.addMappingCountCall(MappedStructs, ["itemCount", []], null, ["itemMap", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const item_identifiers = [];
    for(let i = 0; i < expectedResultCount; i++) {
        item_identifiers.push( ZoomLibraryInstance.addType4Call(MappedStructs, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    }
    

    // The propery holding the mapping count
    const itemCount_identifier2 = ZoomLibraryInstance.addMappingCountCall(MappedStructsTwo, ["itemCount", []], null, ["itemMap", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const item_identifiers2 = [];
    for(let i = 0; i < expectedResultCount; i++) {
        item_identifiers2.push( ZoomLibraryInstance.addType4Call(MappedStructsTwo, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    }


    // The propery holding the mapping count
    const ECAuctionitemCount_identifier = ZoomLibraryInstance.addMappingCountCall(ECAuction, ["bid_count", []], null, ["bid_history", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const ECAuctionitem_identifiers = [];
    for(let i = 0; i < expectedResultCount; i++) {
        ECAuctionitem_identifiers.push( ZoomLibraryInstance.addType4Call(ECAuction, ["bid_history", [i]], "bid_history(uint256) returns ( address, uint256, uint256)" ) );
    }
    
    let cardType = 0;
    let discount = 100;
    let methodSig = "getNextAvailableIdOfType(uint256 _card_type) public view returns (uint256)";
    const getNextAvailableIdOfType0 = ZoomLibraryInstance.addMappingCountCall(ECNFT, ["getNextAvailableIdOfType", [cardType]], methodSig, ["getCardPrice", [0, cardType, discount]] );
    const getCardPrice0 = ZoomLibraryInstance.addType4Call(ECNFT, ["getCardPrice", [0, cardType, discount]], "getCardPrice(uint256, uint256, uint256) returns (uint256)" )

    cardType = 1;
    const getNextAvailableIdOfType1 =ZoomLibraryInstance.addMappingCountCall(ECNFT, ["getNextAvailableIdOfType", [cardType]], methodSig, ["getCardPrice", [0, cardType, discount]]);
    const getCardPrice1 = ZoomLibraryInstance.addType4Call(ECNFT, ["getCardPrice", [0, cardType, discount]], "getCardPrice(uint256, uint256, uint256) returns (uint256)" )

    cardType = 2;
    const getNextAvailableIdOfType2 =ZoomLibraryInstance.addMappingCountCall(ECNFT, ["getNextAvailableIdOfType", [cardType]], methodSig, ["getCardPrice", [0, cardType, discount]]);
    const getCardPrice2 = ZoomLibraryInstance.addType4Call(ECNFT, ["getCardPrice", [0, cardType, discount]], "getCardPrice(uint256, uint256, uint256) returns (uint256)" )

    cardType = 3;
    const getNextAvailableIdOfType3 =ZoomLibraryInstance.addMappingCountCall(ECNFT, ["getNextAvailableIdOfType", [cardType]], methodSig, ["getCardPrice", [0, cardType, discount]]);
    const getCardPrice3 = ZoomLibraryInstance.addType4Call(ECNFT, ["getCardPrice", [0, cardType, discount]], "getCardPrice(uint256, uint256, uint256) returns (uint256)" )
    

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

    // console.log("itemCount:", parseInt( ZoomLibraryInstance.decodeCall(itemCount_identifier).toString() ) );
       
    // for(let i = 0; i < expectedResultCount; i++) {
    //     console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString());
    // }

    // console.log("itemCount:", parseInt( ZoomLibraryInstance.decodeCall(itemCount_identifier2).toString() ) );
       
    // for(let i = 0; i < expectedResultCount; i++) {
    //     console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers2[i]).toString());
    // }

    
    // console.log("=>>>>>> ECAuction:");
    // const bidCount = ZoomLibraryInstance.decodeCall(ECAuctionitemCount_identifier).toString();
    // console.log("bid_count:", parseInt( bidCount ) );
       
    // for(let i = 0; i < expectedResultCount; i++) {
    //     console.log("bid_history["+i+"]: ", ZoomLibraryInstance.decodeCall(ECAuctionitem_identifiers[i]).toString());
    // }

    // const lastBid = await ECAuction.bid_history(bidCount);

    // console.log();
    // console.log( "validate last bid -> bid_history[0] in zoom / bid_history["+lastBid+"] in web3");
    // console.log(lastBid.toString());

    
    console.log("getNextAvailableIdOfType(0)", ZoomLibraryInstance.decodeCall(getNextAvailableIdOfType0).toString());
    console.log("getNextAvailableIdOfType(1):", ZoomLibraryInstance.decodeCall(getNextAvailableIdOfType1).toString());
    console.log("getNextAvailableIdOfType(2):", ZoomLibraryInstance.decodeCall(getNextAvailableIdOfType2).toString());
    console.log("getNextAvailableIdOfType(3):", ZoomLibraryInstance.decodeCall(getNextAvailableIdOfType3).toString());

    console.log("getCardPrice(X, 0, 100):", ZoomLibraryInstance.decodeCall(getCardPrice0).toString());
    console.log("getCardPrice(X, 1, 100):", ZoomLibraryInstance.decodeCall(getCardPrice1).toString());
    console.log("getCardPrice(X, 2, 100):", ZoomLibraryInstance.decodeCall(getCardPrice2).toString());
    console.log("getCardPrice(X, 3, 100):", ZoomLibraryInstance.decodeCall(getCardPrice3).toString());


    console.log("======== ZOOM RESULTS END ===========" );

}

init();