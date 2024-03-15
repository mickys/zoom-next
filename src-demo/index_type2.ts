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

const REGISTRY_ABI      = [
    "function getRegistryAddress(string memory key) external view returns (address)",
    "function getRegistryUINT(string memory key) external view returns (uint256)",
];
const REGISTRY_ADDRESS          = "0x1e8150050A7a4715aad42b905C08df76883f396F";
const versionABI                = [
    "function getVersion(address) external view returns (uint256)",
    "function version() external view returns (uint256)"
];

import ZoomArtifacts from '../artifacts/contracts/Zoom4.sol/Zoom4.json';

const ethersProvider = new ethers.providers.JsonRpcProvider("https://sepolia.nowlive.ro/");

function idToAddress(id: number) {
    let numHex =  ethers.utils.hexlify(id);
    numHex = numHex.substring(2, numHex.length);
    let addr = ethers.constants.AddressZero;
    addr = addr.substring(0, addr.length - numHex.length );
    return addr+numHex;
}

async function init() {

    const TheRegistry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, ethersProvider);
    const ZOOM_VERSION_VIEW_ADDRESS = await TheRegistry.getRegistryAddress("ZOOM_VERSION_VIEW");
    const ZoomVersionView = new ethers.Contract(ZOOM_VERSION_VIEW_ADDRESS, versionABI, ethersProvider);

    const ZOOM_ADDRESS = await TheRegistry.getRegistryAddress("ZOOM");
    const ZoomContractInstance = new ethers.Contract(ZOOM_ADDRESS, ZoomArtifacts.abi, ethersProvider);

    console.log("========== ZOOM SETUP ===============" );
    // Once everything is loaded instantiate the Zoom Library
    const ZoomLibraryInstance = new Zoom();

    // setup calls

    let _identifiers: any = [];
    let _callNum = 0;


    // const LOOKUP_KEY = "MY_TEST_KEY";
    const LOOKUP_KEY = "VISUAL_TRAIT_REGISTRY_FACTORY";
    // call 1 - getRegistryAddress - type normal
    const getRegistryAddressCall = ZoomLibraryInstance.addCall(
        TheRegistry,
        ["getRegistryAddress(string memory key)", [LOOKUP_KEY]],
        "getRegistryAddress(string memory key) external view returns (address)"
    );

    _identifiers.push(getRegistryAddressCall);
    _callNum++;

    // value of the previous call is the address we want to use as a parameter
    // to this next call to a different contract
    // in our case being ZOOM_VERSION_VIEW.getVersion( result address )
    // call 2 - getVersion() - type 2

    // this is a call where the address is present in A previous result
    const getVersionCall = ZoomLibraryInstance.addCallToResultingAddressCall(
        ZoomVersionView,    // only needs to hold abi so we can encode / decode
        ["version()", []],
        _callNum - 1, // previous call, The call id which will contain our address
        "version() external view returns (uint256)"
    );
    _identifiers.push(getVersionCall);
    _callNum++;



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

    const ACTION_HUB_expected_version = await ZoomVersionView.getVersion("0xA4De0B58a998C6FFe62fDa692777dafB2b2675F0");
    console.log("VISUAL_TRAIT_REGISTRY_FACTORY_expected_version", ACTION_HUB_expected_version);

    let decodedCallNum = 0;

    const ACTION_HUB_address = ZoomLibraryInstance.decodeCall(
        _identifiers[decodedCallNum++]
    );

    console.log("ACTION_HUB_address", ACTION_HUB_address);

    const ACTION_HUB_version = ZoomLibraryInstance.decodeCall(
        _identifiers[decodedCallNum++]
    );

    console.log("ACTION_HUB_version", ACTION_HUB_version);


    console.log("======== ZOOM RESULTS END ===========" );

}

init();




// 000100020000010064
// 00000000001e8150050a7a4715aad42b905c08df76883f396f74b9982c
// 0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d56495355414c5f54524149545f52454749535452595f464143544f5259000000
// 0200240000000000c3f82bc30000000000000000000000000000000000000000000000000000000000000001

// 00010002000001006400000000001e8150050a7a4715aad42b905c08df76883f396f74b9982c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b4d595f544553545f4b45590000000000000000000000000000000000000000000200240000000000c3f82bc30000000000000000000000000000000000000000000000000000000000000001
//                             6a71Ab92Bb603b42169f82cf753808b281349911
// 00010002000001006400000000006a71Ab92Bb603b42169f82cf753808b28134991174b9982c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b4d595f544553545f4b45590000000000000000000000000000000000000000000200240000000000c3f82bc30000000000000000000000000000000000000000000000000000000000000001


// 0x0000000000000000000000005c56f3c44675f4d91b28411743c530a0b8bbc319
// 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020
// 00010002000001006400000000006a71ab92bb603b42169f82cf753808b28134991174b9982c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b4d595f544553545f4b45590000000000000000000000000000000000000000000200240000000000c3f82bc30000000000000000000000000000000000000000000000000000000000000001


// 0x 0000 0000000000 0000000000 5c56f3c446 75f4d91b28 411743c530 a0b8bbc319
// 0x 0000 0000000000 0000000000 0000000000 0000000000 0000 5c56f3 c44675f4d9

// 0x 0000 0000000000 0000000000 5c56f3c446 75f4d91b28 411743c530 a0b8bbc319
// 0x 000000000000000000000000 000000000000000000000000 5c56f3 c44675f4d9


// 00010002000001006400000000006a71Ab92Bb603b42169f82cf753808b28134991174b9982c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a414354494f4e5f485542000000000000000000000000000000000000000000000200240000000c00c3f82bc30000000000000000000000000000000000000000000000000000000000000001
// 00010002000001006400000000006a71Ab92Bb603b42169f82cf753808b28134991174b9982c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b4d595f544553545f4b45590000000000000000000000000000000000000000000200240000000c00c3f82bc30000000000000000000000000000000000000000000000000000000000000001