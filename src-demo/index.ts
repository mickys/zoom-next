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

    // 0xAe071C9b3Eb3942160AE6bCA650683518F70127F 0x7b9789cf736bd2f1ba0cfb7504668622b1a3cecb
    const traitRegistry_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"bool","name":"mode","type":"bool"}],"name":"contractControllerEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_name","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint8","name":"_traitType","type":"uint8"},{"indexed":false,"internalType":"uint16","name":"_start","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"_end","type":"uint16"}],"name":"newTraitEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint16","name":"_traitId","type":"uint16"},{"indexed":true,"internalType":"uint16","name":"_tokenId","type":"uint16"},{"indexed":false,"internalType":"bool","name":"mode","type":"bool"}],"name":"tokenTraitChangeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"traitControllerEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint16","name":"_id","type":"uint16"}],"name":"updateTraitDataEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint16","name":"_id","type":"uint16"},{"indexed":false,"internalType":"string","name":"_name","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint8","name":"_traitType","type":"uint8"},{"indexed":false,"internalType":"uint16","name":"_start","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"_end","type":"uint16"}],"name":"updateTraitEvent","type":"event"},{"inputs":[{"internalType":"string[]","name":"_name","type":"string[]"},{"internalType":"address[]","name":"_implementer","type":"address[]"},{"internalType":"uint8[]","name":"_traitType","type":"uint8[]"},{"internalType":"uint16[]","name":"_start","type":"uint16[]"},{"internalType":"uint16[]","name":"_end","type":"uint16[]"}],"name":"addTrait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint16","name":"traitID","type":"uint16"}],"name":"addressCanModifyTrait","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint16[]","name":"traitIDs","type":"uint16[]"}],"name":"addressCanModifyTraits","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_offset","type":"uint16"}],"name":"getByteAndBit","outputs":[{"internalType":"uint16","name":"_byte","type":"uint16"},{"internalType":"uint8","name":"_bit","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getContractControllerAt","outputs":[{"internalType":"address","name":"_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getContractControllerContains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractControllerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitId","type":"uint16"},{"internalType":"uint8","name":"_page","type":"uint8"},{"internalType":"uint16","name":"_perPage","type":"uint16"}],"name":"getData","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitID","type":"uint16"}],"name":"getImplementer","outputs":[{"internalType":"address","name":"implementer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"getTokenData","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getTraitControllerAccessData","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitID","type":"uint16"},{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"hasTrait","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"},{"internalType":"bool","name":"_mode","type":"bool"}],"name":"setContractController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitId","type":"uint16"},{"internalType":"uint16[]","name":"_ids","type":"uint16[]"},{"internalType":"uint8[]","name":"_data","type":"uint8[]"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitID","type":"uint16"},{"internalType":"uint16","name":"tokenId","type":"uint16"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setTrait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint16","name":"traitID","type":"uint16"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setTraitControllerAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint8[]","name":"_data","type":"uint8[]"}],"name":"setTraitControllerAccessData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"traitID","type":"uint16"},{"internalType":"uint16[]","name":"tokenIds","type":"uint16[]"},{"internalType":"bool[]","name":"_value","type":"bool[]"}],"name":"setTraitOnMultiple","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"tokenData","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"traitControllerAccess","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"traitControllerByAddress","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"traitControllerById","outputs":[{"internalType":"address","name":"_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"traitControllerCount","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"traitCount","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"traits","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"implementer","type":"address"},{"internalType":"uint8","name":"traitType","type":"uint8"},{"internalType":"uint16","name":"start","type":"uint16"},{"internalType":"uint16","name":"end","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_traitId","type":"uint16"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_implementer","type":"address"},{"internalType":"uint8","name":"_traitType","type":"uint8"},{"internalType":"uint16","name":"_start","type":"uint16"},{"internalType":"uint16","name":"_end","type":"uint16"}],"name":"updateTrait","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    const TraitRegistry = new ethers.Contract("0xE4EbA7dcD0C3F0D62f39A8573655531f864F54b5", traitRegistry_abi, ethersProvider);

    // v2 0x5B4B84F5A862A0EAb7a1B8B04946B5947BCEd28c
    // 0xf91b9E3f33b6983CDce93398Db342Ccb52Ad8149
    // 0xc1bd29fb965d57acbb6059befb7377c12858d957
    // 0x19d1168fE8304F07447EFA03Ec0aFc3769683FC3
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
            TraitRegistry, ["traitControllerCount", []] 
        )
    );
    callNum++;

    // starts at 1
    for(let i = 1; i <= 20; i++) {

        // request controller address at ID = i
        controller_item_identifiers.push( 
            ZoomLibraryInstance.addCall(
                TraitRegistry,
                ["traitControllerById(uint16)", [i]],
                "traitControllerById(uint16) returns (address)"
            )
        );
        callNum++;

        controller_item_identifiers.push( 
            ZoomLibraryInstance.addResultReferenceCall(
                TraitRegistry,
                ["getTraitControllerAccessData(address)", [ZERO_ADDRESS]],
                0,
                "getTraitControllerAccessData(address) returns (uint8[])" 
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

    let decodedCallNum = 0;
    const controllerCount = parseInt(ZoomLibraryInstance.decodeCall(controller_item_identifiers[decodedCallNum++]).toString());
    const controllers:any = [];

    console.log("controllerCount", controllerCount);

    // next calls upto maxControllerCountToLoad +1 = values
    for(let i = 0; i < 5; i++) {
        if(i < controllerCount) {
        
            const address = ZoomLibraryInstance.decodeCall(
                controller_item_identifiers[decodedCallNum++]
            );

            const accessData = ZoomLibraryInstance.decodeCall(
                controller_item_identifiers[decodedCallNum++]
            );

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