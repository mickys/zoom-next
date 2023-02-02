/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import { Zoom } from "../src/index";
import {ethers} from 'ethers';
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

import ECNFTArtifacts from './artifacts/ECNFT.json';
import ECAuctionArtifacts from './artifacts/ECAuction.json';

import MappedStructsArtifacts from '../artifacts/contracts/Test/MappedStructs.sol/MappedStructs.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");

async function init() {

    const MappedStructs_address = "0xE213734A6Bba4587F6b3fd1Ee8bb7A85D1243e7e";
    const MappedStructs = new ethers.Contract(MappedStructs_address, MappedStructsArtifacts.abi, ethersProvider);

    const ZoomContractInstance = new ethers.Contract("0x874cfe2e846cd17187db3ac9b3cd9e47db957b28", ZoomArtifacts.abi, ethersProvider);

    console.log("========== ZOOM SETUP ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    // setup calls

    let controller_item_identifiers: any = [];
    let callNum = 0;

    // ---------------------------- LOAD CONTROLLERS START -----------------------
    // traitControllerCount
    // traitControllerById
    // getTraitControllerAccessData

    // get traitControllerCount, so we know how many results to actually parse
    controller_item_identifiers.push(
        ZoomLibraryInstance.addCall(
            MappedStructs, ["itemCount", []] 
        )
    );
    callNum++;

    // starts at 1
    for(let i = 1; i <= 6; i++) {

        // request controller address at ID = i
        controller_item_identifiers.push( 
            ZoomLibraryInstance.addCall(
                MappedStructs,
                ["uintToAddrMap(uint256)", [i]],
                "uintToAddrMap(uint256) returns (address)"
            )
        );
        callNum++;

        controller_item_identifiers.push( 
            ZoomLibraryInstance.addResultReferenceCall(
                MappedStructs,
                ["addrToUintMap(address)", [ZERO_ADDRESS]],
                0,
                "addrToUintMap(address) returns (uint256)" 
            )
        );

        callNum++;
    }


    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();

    console.log( "binary:", ZoomQueryBinary.toString("hex") );
    ZoomLibraryInstance.binary.forEach((item: any) => {
        console.log(item.toString("hex"));
    })

    console.log("======== ZOOM CALL START ============" );
    console.time('zoomCall')

    const combinedResult = await ZoomContractInstance.combine( ZoomQueryBinary );

    console.timeEnd('zoomCall')
    console.log("======== ZOOM CALL END ==============" );

    console.log("combinedResult", combinedResult);
    const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );

    console.log("======== ZOOM RESULTS ===============" );

    console.log("newDataCache", newDataCache);
    let decodedCallNum = 0;
    const controllerCount = parseInt(ZoomLibraryInstance.decodeCall(controller_item_identifiers[decodedCallNum++]).toString());
    const controllers: any = [];

    console.log("controllerCount", controllerCount);

    // next calls upto maxControllerCountToLoad +1 = values
    for(let i = 0; i < 5; i++) {
        if(i < controllerCount) {
        
            const address = ZoomLibraryInstance.decodeCall(
                controller_item_identifiers[decodedCallNum++]
            );

            const accessData = ZoomLibraryInstance.decodeCall(
                controller_item_identifiers[decodedCallNum++]
            ).toString();

            controllers.push({
                    address:address,
                    access:accessData
            });

        } else {
            // increment so we can move on to the next calls
            decodedCallNum++;
        }
    }

    console.log("======== ZOOM RESULTS END ===========" );

    console.log("controllerCount     ", controllerCount);
    for(let i = 0; i < controllers.length; i++) {
        console.log("controllers ["+i+"]     ", controllers[i]);
    }

}

init();