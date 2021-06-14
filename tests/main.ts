const { ZERO_ADDRESS, ROLE, Data } = require('./helpers/common');
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;

// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;
import { Zoom } from "../src/index";

describe("Zoom Tests", function () {

    // web3 library instance that uses Zoom Http Provider
    let ZoomProvider; 

    before(async () => {

        const accounts = await ethers.getSigners();

        // deploy targets
        console.log("============= Targets ===============" );

        // const ListContractArtifacts = await ethers.getContractFactory("ListContract");
        // const ListContract = await ListContractArtifacts.deploy();
        // await ListContract.deployed();
        // console.log("    ListContract:            ", ListContract.address);

        const MappedStructsArtifacts = await ethers.getContractFactory("MappedStructs");
        const MappedStructs = await MappedStructsArtifacts.deploy();
        await MappedStructs.deployed();
        console.log("    MappedStructs:          ", MappedStructs.address);

        const MappedStructsTwo = await MappedStructsArtifacts.deploy();
        await MappedStructsTwo.deployed();
        console.log("    MappedStructsTwo:       ", MappedStructsTwo.address);

        const ZoomContractArtifacts = await ethers.getContractFactory("Zoom2");
        const ZoomContract = await ZoomContractArtifacts.deploy();
        await ZoomContract.deployed();
        console.log("    ZoomContract:           ", ZoomContract.address);

        console.log("========== ZOOM SETUP ===============" );

        // Once everything is loaded instantiate the Zoom Library
        const ZoomLibraryInstance = new Zoom({
            clone_cache: false,
            use_reference_calls: false
        });
    

        const item_identifiers = [];
        const expectedResultCount = 5;
    

        const itemCount_identifier = ZoomLibraryInstance.addMappingCountCall(MappedStructs, ["itemCount", []], null, ["itemMap", [0]]);
        // item_identifiers.push( ZoomLibraryInstance.addType4Call(MappedStructs, ["itemMap", [0]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );

        // const itemMap0_identifier = ZoomLibraryInstance.addCall(MappedStructs, ["itemMap", [5]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" );

        // const itemMap1_identifier = ZoomLibraryInstance.addCall(MappedStructs, ["itemMap", [6]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" );

        for(let i = 0; i < expectedResultCount; i++) {
            item_identifiers.push( ZoomLibraryInstance.addType4Call(MappedStructs, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
        }
    
        // const itemCount_identifierTwo = ZoomLibraryInstance.addCall(MappedStructsTwo, ["itemCount", []] );
        // const item_identifiersTwo = [];
        // const expectedResultCountTwo = 10;
    
        // ZoomLibraryInstance.addSpecialCall(MappedStructsTwo, ["itemMap", ["reset"]]);
        // for(let i = 0; i < expectedResultCountTwo; i++) {
        //     item_identifiersTwo.push( ZoomLibraryInstance.addType4Call(MappedStructsTwo, ["itemMap", [i]], "itemMap(uint256) returns (string, address, uint256, uint16, bool)" ) );
        // }
    
    
        // console.log(ZoomLibraryInstance.calls)
    
        const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();
    
        // console.log( "binary:" );
        // ZoomLibraryInstance.binary.forEach(item => {
        //     console.log(item.toString("hex"));
        // })
    
        // console.log("" );
    
        // console.log( "ZoomQueryBinary:", ZoomQueryBinary.toString("hex") );
    
        console.log("======== ZOOM CALL START ============" );
    
        console.time('zoomCall')
    
        const combinedResult = await ZoomContract.combine( ZoomQueryBinary );
        // console.log( "combinedResult", combinedResult.toString("hex") );
    
        console.timeEnd('zoomCall')
    
        console.log("======== ZOOM CALL END ==============" );
    
        // console.log("combinedResult", combinedResult);
        const newDataCache = ZoomLibraryInstance.resultsToCache( combinedResult, ZoomQueryBinary );
        // console.log( "newDataCache", newDataCache );
    
        console.log("======== ZOOM RESULTS ===============" );
    
        console.log("itemCount:", parseInt( ZoomLibraryInstance.decodeCall(itemCount_identifier).toString() ) );
       
        for(let i = 0; i < expectedResultCount; i++) {
            console.log("itemMap_"+i+": ", ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString());
        }
        console.log("======== ZOOM RESULTS END ===========" );
    

    });

    it("true", async function () {

        expect(true).to.be.equal(true);
        
    });

});