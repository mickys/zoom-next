/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import { Zoom } from "../src/index";
import {ethers} from 'ethers';
import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom.sol/Zoom.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");

async function init() {

    console.log("========== ZOOM SETUP ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom({
        clone_cache: false,
        use_reference_calls: true
    });

    // const ZoomContract_address   = "0xe07a33e2975b7012eb9bf002aa12aba98d7069dc";
    const ZoomContract_address   = "0xE67ecE04c9155Aec82f1439d9C33fa92F4369ef6";
    
    const ZoomContractInstance = new ethers.Contract(ZoomContract_address, ZoomArtifacts.abi, ethersProvider);

    const MappedStructs     = new ethers.Contract("0x95CB80219eE2Dc4bd4839EF8Dd8Fe5C0bbD3f4bc", MappedStructsArtifacts.abi, ethersProvider);
    const MappedStructsTwo  = new ethers.Contract("0x1F2591f095408BB690D2054b778DdE4FD69f4438", MappedStructsArtifacts.abi, ethersProvider);

    

    const itemCount_identifier = ZoomLibraryInstance.addCall(MappedStructs, ["itemCount", []] );
    // const expectedResultCount = 20;
    // const item_identifiers = [];
    // ZoomLibraryInstance.addSpecialCall(MappedStructs, ["itemMap", ["reset"]]);
    // for(let i = 0; i < expectedResultCount; i++) {
    //     item_identifiers.push( ZoomLibraryInstance.addType4Call(MappedStructs, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    // }

    const itemCount_identifierTwo = ZoomLibraryInstance.addCall(MappedStructsTwo, ["itemCount", []] );

    // const expectedResultCountTwo = 10;
    // const item_identifiersTwo = [];

    // ZoomLibraryInstance.addSpecialCall(MappedStructsTwo, ["itemMap", ["reset"]]);
    // for(let i = 0; i < expectedResultCountTwo; i++) {
    //     item_identifiersTwo.push( ZoomLibraryInstance.addType4Call(MappedStructsTwo, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
    // }


    // console.log(ZoomLibraryInstance.calls)

    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    console.log( "binary:" );
    ZoomLibraryInstance.binary.forEach(item => {
        console.log(item.toString("hex"));
    })

    console.log("" );

    console.log( "ZoomQueryBinary:", ZoomQueryBinary.toString("hex") );

    console.log("======== ZOOM CALL START ============" );

    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );
    console.log( "combinedResult", combinedResult.toString("hex") );

    console.timeEnd('zoomCall')

    console.log("======== ZOOM CALL END ==============" );

    console.log("combinedResult", combinedResult);
    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );
    console.log( "newDataCache", newDataCache );

    console.log("======== ZOOM RESULTS ===============" );

    console.log("itemCount:", ZoomLibraryInstance.decodeCall(itemCount_identifier).toString() );

    // for(let i = 0; i < expectedResultCount; i++) {
    // for(let i = 0; i < 2; i++) {
    //     console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers[i]));
    // }


    console.log("itemCount:", ZoomLibraryInstance.decodeCall(itemCount_identifierTwo).toString() );

    // for(let i = 0; i < expectedResultCount; i++) {
    // for(let i = 0; i < 2; i++) {
    //     console.log("itemMapTwo_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiersTwo[i]));
    // }

    console.log("======== ZOOM RESULTS END ===========" );

}

init();