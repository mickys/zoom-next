/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import { Zoom } from "../src/index";
import {ethers} from 'ethers';
import BitArray from "./BitArray";

import ECRegistryArtifacts from './artifacts/ECRegistry.json';
import ZoomArtifacts from '../artifacts/contracts/Zoom2.sol/Zoom2.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.nowlive.ro/");
const BigNumber = ethers.BigNumber;

async function init() {


    const ECRegistry         = new ethers.Contract("0x0C994c9f733C854A83E90711510b80EA0Afe4024", ECRegistryArtifacts.abi, ethersProvider);

    const ZoomContractInstance = new ethers.Contract("0xC878B3C422BeECB879dE0a2bea01D30C88F0ccdc", ZoomArtifacts.abi, ethersProvider);

    console.log("========== ZOOM SETUP ===============" );

    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    // setup calls

    const expectedResultCount = 1750;

    // The propery holding the mapping count
    const item_identifiers = [];
    for(let i = 1; i <= expectedResultCount; i++) {
        item_identifiers.push( ZoomLibraryInstance.addCall(ECRegistry, ["getData", [i]], "getData(uint16 tokenId) external view returns (uint8[] memory)") );
    }
    
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

    // console.log( "item_identifiers:" );
    // item_identifiers.forEach(item => {
    //     console.log(item.toString());
    // })

    // console.log(item_identifiers);
       
    for(let i = 1; i <= expectedResultCount; i++) {

        const decoded = ZoomLibraryInstance.decodeCall(item_identifiers[i-1]);

        if(JSON.stringify(decoded) !== "[[]]") {

            const traitBits = BitArray.fromUint8Array(decoded[0]);
            // console.log(traitBits.toHexString());
            console.log("token_traits_"+i+": ", traitBits.toBinaryString(), decoded.toString("hex") );
        } else {
            console.log("token_traits_"+i+": ");
        }


        // const traitBits = BitArray.fromUint8Array(decoded.toString().split(","))
    }

    console.log("======== ZOOM RESULTS END ===========" );

}

init();