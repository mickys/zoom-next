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
    const ZoomLibraryInstance = new Zoom();


    function toZoomCall(calls, address, methodSig) {
        const key = address+"_"+methodSig;
        calls[key] = "";
        return calls;
    }

    function decodeZoomCall(data, address, contract, methodSig, fullSig:any = false) {
    let key = (address+"_"+methodSig).toLowerCase();
    if(fullSig !== false) {
        key = (address+"_"+fullSig).toLowerCase();
    }
    return contract.interface.decodeFunctionResult(methodSig, data[key]);
    }

    const ZoomContract_address   = "0xe07a33e2975b7012eb9bf002aa12aba98d7069dc";
    const ZoomContractInstance = new ethers.Contract(ZoomContract_address, ZoomArtifacts.abi, ethersProvider);

    const MappedStructs_address = "0x95CB80219eE2Dc4bd4839EF8Dd8Fe5C0bbD3f4bc";
    const MappedStructs = new ethers.Contract(MappedStructs_address, MappedStructsArtifacts.abi, ethersProvider);

    const sig_item_count = MappedStructs.interface.encodeFunctionData("itemCount", []);

    const ret_itemMap = "itemMap(uint256) returns (string, address, uint256, uint16, bool)";
    const sig_itemMap_0 = MappedStructs.interface.encodeFunctionData("itemMap", [0]);
    const sig_itemMap_1 = MappedStructs.interface.encodeFunctionData("itemMap", [1]);
    const sig_itemMap_2 = MappedStructs.interface.encodeFunctionData("itemMap", [2]);
    const sig_itemMap_3 = MappedStructs.interface.encodeFunctionData("itemMap", [3]);

    let calls = {};
    calls = toZoomCall(calls, MappedStructs_address, sig_item_count);
    calls = toZoomCall(calls, MappedStructs_address, sig_itemMap_0);
    calls = toZoomCall(calls, MappedStructs_address, sig_itemMap_1);
    calls = toZoomCall(calls, MappedStructs_address, sig_itemMap_2);
    calls = toZoomCall(calls, MappedStructs_address, sig_itemMap_3);



    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall( calls );
    console.log( "ZoomQueryBinary:", ZoomQueryBinary.toString("hex") );

    console.log("======== ZOOM CALL START ============" );

    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );
    console.log( "combinedResult", combinedResult.toString("hex") );

    console.timeEnd('zoomCall')

    console.log("======== ZOOM CALL END ==============" );

    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );
    console.log( "newDataCache", newDataCache );

    const itemCount = decodeZoomCall(newDataCache, MappedStructs_address, MappedStructs, sig_item_count );

    const itemMap_0 = decodeZoomCall(newDataCache, MappedStructs_address, MappedStructs, ret_itemMap, sig_itemMap_0 );
    const itemMap_1 = decodeZoomCall(newDataCache, MappedStructs_address, MappedStructs, ret_itemMap, sig_itemMap_1 );
    const itemMap_2 = decodeZoomCall(newDataCache, MappedStructs_address, MappedStructs, ret_itemMap, sig_itemMap_2 );
    const itemMap_3 = decodeZoomCall(newDataCache, MappedStructs_address, MappedStructs, ret_itemMap, sig_itemMap_3 );


    console.log("======== ZOOM RESULTS ===============" );

    console.log("itemCount:", itemCount.toString() );

    console.log("itemMap_0: ", itemMap_0);
    console.log("itemMap_1: ", itemMap_1);
    console.log("itemMap_2: ", itemMap_2);
    console.log("itemMap_3: ", itemMap_3);

    console.log("======== ZOOM RESULTS END ===========" );

}

init();