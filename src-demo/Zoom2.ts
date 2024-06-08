/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/
import { Zoom2 } from "../src/index";
import { ethers } from 'ethers';

const REGISTRY_ABI       = [
    "function setRegistryAddress(string memory key, address target)",
    "function getRegistryAddress(string memory key) external view returns (address)",
    "function getRegistryUINT(string memory key) external view returns (uint256)",
    "function nextAdmin() external view returns (uint256)",
    "function adminEntries(uint256) external view returns (address)",
    "function admins(address) external view returns (bool)",
];

export const versionABI         = [
    "function getVersion(address) external view returns (uint256)",
    "function version() external view returns (uint256)"
];

async function init() {

    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.nowlive.ro/");

    const ZoomLibraryInstance = new Zoom2();
    const ZoomContractInstance = new ethers.Contract("0xaeca29502D9260439e009083F45cc2d9F1fA1267", ZoomLibraryInstance.zoomABI, provider);
    const ZoomVersionView = new ethers.Contract("0x3D4F573904B98066887332EdeF1b3f9b155e8080", versionABI, provider);

    let TheRegistry = new ethers.Contract("0xCA94d8F6ecF6D6321863Ad0cA95E248d0bd7263D", REGISTRY_ABI, provider);

    const ACTION_HUB = ZoomLibraryInstance.addMappingCountCall(
        // the contract we're calling
        TheRegistry,
        // the method that is returing our address
        ["getRegistryAddress(string memory key)", ["ACTION_HUB"]],
        // signature used to decode the result
        "getRegistryAddress(string memory key) external view returns (address)",
        // array of next method calls that will use the result of this current call
        [
            { contract: ZoomVersionView, mapAndParams: ["getVersion(address)", [ethers.constants.AddressZero]] }
        ]
    );

    // value of the previous call is the address we want to use as a parameter
    // to this next call to a different contract
    // in our case being ZOOM_VERSION_VIEW.getVersion( result address )
    // call 2 - getVersion() - type 7

    // this is a call where the address is present in the previous result
    const ACTION_HUB_Version = ZoomLibraryInstance.addResultReferenceCall(
        ZoomVersionView,
        ["getVersion(address)", [ethers.constants.AddressZero]],
        0,
        "getVersion(address) returns (uint256)" 
    );


    const TEST_KEY = ZoomLibraryInstance.addMappingCountCall(
        // the contract we're calling
        TheRegistry,
        // the method that is returing our address
        ["getRegistryAddress(string memory key)", ["TEST_KEY"]],
        // signature used to decode the result
        "getRegistryAddress(string memory key) external view returns (address)",
        // array of next method calls that will use the result of this current call
        [
            { contract: ZoomVersionView, mapAndParams: ["getVersion(address)", [ethers.constants.AddressZero]] }
        ]
    );

    // value of the previous call is the address we want to use as a parameter
    // to this next call to a different contract
    // in our case being ZOOM_VERSION_VIEW.getVersion( result address )
    // call 2 - getVersion() - type 7

    // this is a call where the address is present in the previous result
    const TEST_KEY_Version = ZoomLibraryInstance.addResultReferenceCall(
        ZoomVersionView,
        ["getVersion(address)", [ethers.constants.AddressZero]],
        0,
        "getVersion(address) returns (uint256)" 
    );

    const COMMUNITY_LIST = ZoomLibraryInstance.addCall(
        TheRegistry,
        ["getRegistryAddress(string memory key)", ["COMMUNITY_LIST"]],
        "getRegistryAddress(string memory key) external view returns (address)"
    );

    await ZoomLibraryInstance.runZoomCallAndFulfillPromises(ZoomContractInstance, true, console.log);

    console.log("ACTION_HUB is:      ", await ACTION_HUB);
    console.log("ACTION_HUB Version: ", await (ACTION_HUB_Version).catch((e)=>{ return 0; }) );
 
    console.log("TEST_KEY is:        ", await TEST_KEY);
    console.log("TEST_KEY Version:   ", await (TEST_KEY_Version).catch((e)=>{ return 0; }) );
    
    console.log("COMMUNITY_LIST is:  ", await COMMUNITY_LIST);

}

init();