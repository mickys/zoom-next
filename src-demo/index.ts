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

    
    const ECNFT         = new ethers.Contract("0xAe071C9b3Eb3942160AE6bCA650683518F70127F", ECNFTArtifacts.abi, ethersProvider);
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
    const itemCount_identifier = ZoomLibraryInstance.addMappingCountCall(MappedStructs, ["itemCount", []], ["itemMap", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const item_identifiers = [];
    for(let i = 0; i < expectedResultCount; i++) {
        item_identifiers.push( ZoomLibraryInstance.addType4Call(MappedStructs, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    }
    

    // The propery holding the mapping count
    const itemCount_identifier2 = ZoomLibraryInstance.addMappingCountCall(MappedStructsTwo, ["itemCount", []], ["itemMap", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const item_identifiers2 = [];
    for(let i = 0; i < expectedResultCount; i++) {
        item_identifiers2.push( ZoomLibraryInstance.addType4Call(MappedStructsTwo, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    }


    // The propery holding the mapping count
    const ECAuctionitemCount_identifier = ZoomLibraryInstance.addMappingCountCall(ECAuction, ["bid_count", []], ["bid_history", [0]]);

    // Make the same number of calls as "latest items" you want to retrieve
    const ECAuctionitem_identifiers = [];
    for(let i = 0; i < expectedResultCount; i++) {
        ECAuctionitem_identifiers.push( ZoomLibraryInstance.addType4Call(ECAuction, ["bid_history", [i]], "bid_history(uint256) returns ( address, uint256, uint256)" ) );
    }
    

    

    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    console.log("======== ZOOM CALL START ============" );
    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );

    console.timeEnd('zoomCall')
    console.log("======== ZOOM CALL END ==============" );

    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS ===============" );

    console.log("itemCount:", parseInt( ZoomLibraryInstance.decodeCall(itemCount_identifier).toString() ) );
       
    for(let i = 0; i < expectedResultCount; i++) {
        console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString());
    }

    console.log("itemCount:", parseInt( ZoomLibraryInstance.decodeCall(itemCount_identifier2).toString() ) );
       
    for(let i = 0; i < expectedResultCount; i++) {
        console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers2[i]).toString());
    }

    
    console.log("=>>>>>> ECAuction:");
    const bidCount = ZoomLibraryInstance.decodeCall(ECAuctionitemCount_identifier).toString();
    console.log("bid_count:", parseInt( bidCount ) );
       
    for(let i = 0; i < expectedResultCount; i++) {
        console.log("bid_history["+i+"]: ", ZoomLibraryInstance.decodeCall(ECAuctionitem_identifiers[i]).toString());
    }

    const lastBid = await ECAuction.bid_history(bidCount);

    console.log();
    console.log( "validate last bid -> bid_history[0] in zoom / bid_history["+lastBid+"] in web3");
    console.log(lastBid.toString());

    console.log("======== ZOOM RESULTS END ===========" );

}

init();