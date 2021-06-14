const { ZERO_ADDRESS, ROLE, Data } = require('./helpers/common');
const { expect } = require("chai");

// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;


const OfficialWeb3                  = require('web3');
const HttpProvider                  = require("../web3/HttpProviderCache");
const WsProvider                    = require("../web3/WsProviderCache");
const ZoomLibrary                   = require("../../dist/lib/index.js");

const helpers                       = setup.helpers;
const globals                       = setup.globals;
const utils                         = helpers.utils;
const web3util                      = helpers.web3util;
const web3                          = helpers.web3;

const ListContractInstance          = globals.ListContractInstance;
const ZoomContractInstance          = globals.ZoomContractInstance;



describe("Zoom Tests", function () {

    // web3 library instance that uses Zoom Http Provider
    let ZoomProvider; 

    before(async () => {

        // custom zoom provider
        ZoomProvider = new ZoomLibrary.HttpProvider( setup.globals.network_config_http );

        // ZoomProvider = new WsProvider["default"]( setup.globals.network_config_ws );
        // no result caching at this stage
        ZoomProvider.enableCache(false);

        // instantiate library
        const ZoomLibraryInstance = new ZoomLibrary.Zoom( {use_reference_calls: globals.use_reference_calls } );

        // prepare binary call
        const combinedBinaryCall = ZoomLibraryInstance.getZoomCall(
            // saved requests from profiling run ( web3.multi )
            globals.multiWeb3Provider.cache
        );

        // eth_estimateGas fails if call is bigger than block gasLimit..
        // so we have to guesstimate it based on previous calls
        // 200 item call results in 3075.17 per item
        // count number of binary calls, and only do a real estimation if count is lower than 1k
        let trueGasEstimate = true;
        if( ZoomLibraryInstance.binary.length > 1000 ) {
            trueGasEstimate = false;
        }

        const combinedResult = await utils.measureCallExecution( 
            ZoomContractInstance.methods.combine( combinedBinaryCall ), trueGasEstimate, { gas: 50000000 }
        );

        globals.ZoomCallTime = combinedResult.time;
        globals.ZoomTotalGasUsage = combinedResult.gas;

        if( trueGasEstimate === false ) {
            globals.ZoomTotalGasUsage = ( ZoomLibraryInstance.binary.length * 3075.17 );
        }

        const ZoomTest = new ZoomLibrary.Zoom( {use_reference_calls: true } );
        const newCache = ZoomTest.resultsToCache( combinedResult.data, combinedBinaryCall );

        // enable result caching
        ZoomProvider.enableCache(true);
        ZoomProvider.setCache( newCache );

    });

});