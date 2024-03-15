/*

 * source       https://github.com/mickys/zoom-next/
 * @name        Zoom Core
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT
 
*/
import ByteArray from "../utils/ByteArray";
import MD5 from "../utils/MD5";

/**
 * Zoom Constructor options
 * 
 * clone_cache - boolean - "clone or reference the cache variable"
 * use_reference_calls - boolean - replace calls in binary by result reference and offsets
 * 
 */
interface ZoomOptions {
    clone_cache: boolean;
    use_reference_calls?: boolean;
}

interface addressInResult {
    callNum: number;
    bytePosition: number;
    found: boolean;
}

interface packetFormat {
    type: number;
    dataLength: number;
    resultId: number;
    offset: number;
    toAddress: ByteArray;
}

export default class Zoom {

    public version: number = 1;
    public options: ZoomOptions = {
        clone_cache: false,
        use_reference_calls: true
    };

    public cache: {} = {};
    public calls: {} = {};
    public callsData: {} = {};
    public binary: any = [];
    public lastCallData: any;
    public methodSigPointers:[] = [];

    public lastMappingCountCallID = 0;

    private addressInAnyResultCache: {} = {};

    /**
     * 
     * @param {options} - ZoomOptions
     */
    constructor(options?: ZoomOptions) {
        if (typeof options !== "undefined") {
            this.options = Object.assign({}, options);
        }
    }

    /**
     * Assign cache and build the binary call
     * 
     * @param {cache} - ZoomOptions
     * @returns Buffer containing resulting call
     */
    public getZoomCall(cache?: {}): any {

        if(typeof cache === "undefined") {
            this.cache = this.calls;
            this.calls = {};
        } else {
            if (this.options.clone_cache === true) {
                this.cache = Object.assign({}, cache);
            } else {
                this.cache = cache;
            }
        }

        // no longer used
        // this.groupCalls();
        this.generateBinaryCalls();

        return Buffer.from(
            this.addZoomHeader(
                this.getBinaryCall()
            ),
            "hex"
        );

    }

    /** 
     * Concatenate all binary calls we have into one large string
     * @param data - the string containing all the calls we want to make
     * @returns string
     */
    public addZoomHeader(data: string): string {

        const bytes = new ByteArray(Buffer.alloc(2 + 2 + 2));
        // add version
        bytes.writeUnsignedShort(this.version);

        // add call num
        bytes.writeUnsignedShort(this.binary.length);

        // add expected return size - 0 as it is no longer used
        bytes.writeUnsignedShort(0);

        // add 0x start and return
        return bytes.toString("hex") + data;
    }

    /** 
     * Concatenate all binary calls we have into one large string
     * @returns string
     */
    public getBinaryCall(): string {

        // There is a case when a type 2 - type 4 call might reference a later result
        // 
        // This can happen if the user first calls a contract with a hardcoded
        // address which is then found in a result of a call
        // 
        // sort our calls so type 1 are run first, otherwise we might end up with 
        // type 2 - type 4 calls that cannot resolve their "toAddress" references

        // this.binary.sort(function (objA, objB) {
        //     return (objA < objB) ? -1 : (objA > objB) ? 1 : 0;
        // });

        let data = "";
        for (let i = 0; i < this.binary.length; i++) {
            data += this.binary[i].toString("hex");
        }
        return data;
    }


    /** 
     * Iterate through our calls and create binaries
     */
     public generateBinaryCalls() {

        let callIndex = 0;
        this.binary = [];

        Object.keys(this.cache).forEach((call, idx) => {
            // console.log("idx", idx)
            const str = call.split("_");
            // split address from data
            const callToAddress = str[0];
            const callDataString = str[1];
            let count: any;
            if(typeof str[2] !== "undefined") {
                count = str[2];
            }

            
            // convert our hex string to a buffer so we can actually use it
            const callData = new ByteArray( Buffer.from(this.removeZeroX(callDataString), "hex") );

            const packet: packetFormat = {
                type: 1,
                dataLength: callData.length,
                resultId: 0,
                offset: 0,
                toAddress: new ByteArray( Buffer.from(this.removeZeroX(callToAddress), "hex") ), // key contains to address
            };

            let _key = (callToAddress+"_"+callDataString).toLowerCase();
            if(count) {
                _key = (callToAddress+"_"+callDataString+"_"+count).toLowerCase();
            }
            const identifier = MD5.hash(_key);

            if(typeof this.callsData[identifier] !== "undefined") {

                const callType = this.callsData[identifier].type;
                const sig = this.toMethodSignature(callData.toString("hex"));
                // console.log("sig", sig, "callType", callType, "callIndex", callIndex, "callDataString", callDataString, "mapkeys:",  this.callsData[identifier].mapkey);

                if(typeof callType !== "undefined" ) {
                    
                    if(callType === 2) {

                        packet.type = 2;
                        packet.toAddress = new ByteArray(Buffer.alloc(0));
                        packet.resultId = this.callsData[identifier].resultIndex;
                        packet.offset = this.callsData[identifier].resultIndex * 32 + 12;

                    } else if(callType === 3) {
                        for(let y = 0; y < this.callsData[identifier].mapkey.length; y++) {
                            this.setMethodSigPointer(this.callsData[identifier].mapkey[y], callIndex);
                        }
                        packet.type = 3;
                        this.lastMappingCountCallID = callIndex;

                        // console.log("type3 identifier", this.callsData[identifier].key, callIndex);

                    } else if(callType === 4) {
                        // read method sig and find counter
                        const resultId = this.getMethodSigPointer(sig);
                        packet.type = 4;
                        packet.resultId = resultId.toString();
                    } else if(callType === 5) {
                        // read method sig and find counter
                        const resultId = this.getMethodSigPointer(sig);
                        packet.type = 5;
                        packet.resultId = resultId.toString();
                    
                    } else if(callType === 6) {
                        // previous call always.
                        packet.type = 6;
                        packet.resultId = callIndex;
                        // packet.resultId = this.lastMappingCountCallID;
                    
                    } else if(callType === 7) {
                        packet.type = 7;
                        // mapping call id.
                        packet.resultId = this.lastMappingCountCallID;
                    }

                }
                callIndex++;
                
                // console.log("encoded:", idx, callIndex, this.binary.length, packet.type, this.createBinaryCallByteArray(packet, callData).toString("hex"));

                this.binary.push(this.createBinaryCallByteArray(packet, callData));
            }
        });
    }

    public setMethodSigPointer(sig:string, nr:number) {
        this.methodSigPointers[sig] = nr;
    }

    public getMethodSigPointer(sig:string) {
        return this.methodSigPointers[sig];
    }


    /** 
     * create binary call byte array
     * 
     * @param packet - {@link (packetFormat:interface)}
     * @param callData - Buffer containing method sha and hex encoded parameter values
     * @returns {ByteArray}
     */
    public createBinaryCallByteArray(packet: packetFormat, callData: ByteArray): ByteArray {

        const bytes: ByteArray = new ByteArray(Buffer.alloc(8));

        // - 1 normal 
        // - 2 to address is result of a previous call
        // - 3 first uint256 parameter is result of a previous call
        // - 4 reset view internal counter
        // 
        // 1 byte - uint8 call type 
        bytes.writeByte(packet.type);

        // 2 bytes - uint16 call_data length
        bytes.writeUnsignedShort(packet.dataLength);

        // 2 bytes - uint16 result_id that holds our call's address or resultCount
        bytes.writeUnsignedShort(packet.resultId);

        // 2 bytes - bytes uint16 offset in bytes where the address starts in said result
        bytes.writeUnsignedShort(packet.offset);

        // 1 empty byte
        bytes.writeByte(0);

        // 20 bytes address / or none if type 2
        bytes.copyBytes(packet.toAddress, 0);

        // 4 bytes method sha + dynamic for the rest 0 to any
        bytes.copyBytes(callData, 0);

        return bytes;
    }

    /** 
     * Remove 0x from string then return it
     * @param string
     * @returns string
     */
    public removeZeroX(string: string): string {
        return string.replace("0x", "");
    }

    /** 
     * Group calls by "to" address
     */
    public groupCalls(): void {
        Object.keys(this.cache).forEach((key: string) => {
            const parts = key.split("_");
            const toAddress = parts[0];
            const toCall = parts[1];

            if (!this.calls.hasOwnProperty(toAddress)) {
                this.calls[toAddress] = [];
            }

            this.calls[toAddress].push(toCall)
        });
    }


    public determineResultPositionByte() {

    }

    /** 
     * Search current calls for the "to address" and if found return index and byte offset
     * 
     * @param to - the call address
     * 
     * @returns { addressInResult }
     */
    public findToAddressInAnyResult(to: string): any {

        if (typeof this.addressInAnyResultCache[to] === "undefined") {

            const cleanTo = this.removeZeroX(to);
            const Result: addressInResult = {
                callNum: 0,
                bytePosition: 0,
                found: false,
            };

            Object.keys(this.cache).some((key: string, index: number) => {
                const position = this.cache[key].indexOf(cleanTo);
                if (position > -1) {
                    Result.callNum = index;
                    Result.bytePosition = (position - 2) / 2; // adjust for 0x in result
                    Result.found = true;
                    return true;
                }
                return false;
            });

            this.addressInAnyResultCache[to] = Result;
        }

        return this.addressInAnyResultCache[to];
    }

    /** 
     * Converts the binary returned by the Zoom Smart contract back into a cache object
     * 
     * @param binaryString
     * 
     * @returns new cache object
     */
    public resultsToCache(callResult: any, combinedBinaryCall: Buffer): {} {

        const newData = {};

        const resultString = this.removeZeroX(callResult[0]);
        const resultOffsets = this.readOffsets(callResult[1]);

        // push resultString length as last offset, so we can the last result
        resultOffsets.push(resultString.length / 2);

        const bytes: ByteArray = new ByteArray(combinedBinaryCall);

        // Read Zoom Header
        // bypass version ( 2 bytes )
        bytes.advanceReadPositionBy(2);

        // read number of calls ( 2 bytes )
        const callLength = bytes.readUnsignedShort();

        // bypass unused space ( 2 bytes ) so bytes.readPosition is now at call data space.
        bytes.advanceReadPositionBy(2);

        // parse and index results
        const Results = [];
        for (let i = 0; i < callLength; i++) {
            Results.push(
                resultString.substring(
                    resultOffsets[i] * 2,
                    resultOffsets[i + 1] * 2
                )
            );
        }

        // console.log("Results", Results)

        for (let i = 0; i < callLength; i++) {

            // 1 byte - uint8 call type ( 1 normal / 2 - to address is result of a previous call )
            const type = bytes.readByte();

            // 2 bytes - uint16 call_data length
            const callDataLength = bytes.readUnsignedShort();

            let toAddress: string;

            if (type === 1 || type === 3 || type === 4 || type === 5 || type === 6 || type === 7) {
                // bypass 5 bytes used in type 2 ( 2 result id / 2 offset / 1 byte for unused space )
                bytes.advanceReadPositionBy(5);

                // normal call that contains toAddress and callData
                const AddressByteArray = new ByteArray(20);
                bytes.readBytes(AddressByteArray, 0, 20);
                toAddress = AddressByteArray.toString("hex");

            } else if (type === 2) {

                // referenced call that contains callData, toAddress is in result
                const resultId = bytes.readUnsignedShort();
                const resultOffset = bytes.readUnsignedShort();

                toAddress = Results[resultId].substring(
                    resultOffset * 2,
                    (resultOffset + 20) * 2
                );

                // bypass unused space ( 1 bytes ) so bytes.readPosition is now at callData space.
                bytes.advanceReadPositionBy(1);
            
            }

            // console.log("callDataLength", callDataLength, bytes.readPosition, bytes.toString("hex"));
            const callData = new ByteArray(callDataLength);
            bytes.readBytes(callData, 0, callDataLength);

            // combine our call and data and attach result
            let _key = "0x" + toAddress + "_0x" + callData.toString("hex");

            if (type === 6 || type === 7) {
                let count = 0;
                let _newkey = _key+"_"+count;
                
                if(typeof newData[_key] === "undefined") {
                    // assign old value to new _0 value
                    const oldData = newData[_key];
                    newData[_key] = count;
                    newData[_newkey] = oldData;
                } else {
                    count = ++newData[_key];
                }
                _key = _key+"_"+count;
            }

            newData[_key] = "0x"+Results[i];
        }

        // make sure the result length matches our expected size,
        // otherwise let the user know something went wrong
        if (callLength !== Results.length) {
            throw new Error("Zoom: Result size error, something went wrong.");
        }

        this.lastCallData = newData;
        // console.log("newData", newData);

        return newData;
    }

    public toBuffer(string) {
        return Buffer.from(string, "hex");
    }

    private readOffsets(binaryString: string): any {

        // strip out 0x
        const cleanBinary = this.removeZeroX(binaryString);

        // convert the result to a byte array so we can process it
        const bytes: ByteArray = new ByteArray(
            Buffer.from(cleanBinary, "hex")
        );

        // divide by 32 bytes to find the number of results we need to read
        const resultLenght = bytes.length / 32;
        const Results = [];

        for (let i = 0; i < resultLenght; i++) {
            // 4 byte - 32 bit uint max = 4,294,967,295
            // provides more than enough 4GB of data in the output buffer

            // so.. offset our read pointer by 28 bytes
            bytes.advanceReadPositionBy(28);

            // then read our offset
            Results.push(
                bytes.readUnsignedInt()
            )
        }

        return Results;
    }


    /** 
     * Add a call to an address 
     * 
     * @param _contract
     * @param _methodAndParams
     * @param _fullSig
     * 
     * @returns call indentifier
     */
    public addCall(_contract:any, _methodAndParams: any, _fullSig?: string): string {

        const methodSig = _contract.interface.encodeFunctionData(..._methodAndParams);
        const _key = (_contract.address+"_"+methodSig).toLowerCase();
        const identifier = MD5.hash(_key);

        if(typeof this.calls[_key] !== "undefined") {
            throw new Error("key already in use["+_key+"]");
        }
        this.calls[_key] = "";

        if(typeof _fullSig === "undefined") {
            _fullSig = methodSig;
        }

        this.callsData[identifier] = {
            contract: _contract,
            key: _key,
            fullSig: _fullSig
        };

        return identifier;
    }

    public addType4Call(_contract:any, _methodAndParams: any, _fullSig?: string) {
        return this.addTypeCall(4, _contract, _methodAndParams, _fullSig);
    }

    public addType5Call(_contract:any, _methodAndParams: any, _fullSig?: string) {
        return this.addTypeCall(5, _contract, _methodAndParams, _fullSig);
    }

    public addTypeCall(_type: number, _contract:any, _methodAndParams: any, _fullSig?: string) {

        const methodSig = _contract.interface.encodeFunctionData(..._methodAndParams);
        const _key = (_contract.address+"_"+methodSig).toLowerCase();
        const identifier = MD5.hash(_key);

        this.calls[_key] = "";

        if(typeof _fullSig === "undefined") {
            _fullSig = methodSig;
        }

        this.callsData[identifier] = {
            contract: _contract,
            key: _key,
            fullSig: _fullSig,
            type: _type
        };

        return identifier;
    }

    /** 
     * Add a special view call
     * 
     * @param _contract
     * @param type
     * 
     */
    public addMappingCountCall(_contract:any, _methodAndParams: any, _fullSig: any, sigs: any[]) {

        const methodSig = _contract.interface.encodeFunctionData(..._methodAndParams);
        const _key = (_contract.address+"_"+methodSig).toLowerCase();
        this.calls[_key] = "";
        const identifier = MD5.hash(_key);
        const _mapkeys = [];

        for(let i = 0; i < sigs.length; i++) {
            const resolveSig = sigs[i].contract.interface.encodeFunctionData(...sigs[i].mapAndParams);
            _mapkeys.push((this.toMethodSignature(resolveSig.toString("hex"))).toLowerCase());
        }

        this.callsData[identifier] = {
            contract: _contract,
            key: _key,
            mapkey: _mapkeys,
            fullSig: methodSig,
            type: 3
        };

        if(_fullSig !== null) {
            this.callsData[identifier].decodeSig = _fullSig;
        }
        

        return identifier;
    }

    /** 
     * Add a special view call
     * 
     * @param _contract
     * @param type
     * 
     */
    
    public addResultReferenceCountedCall(_contract:any, _methodAndParams: any, resultIndex: number, _fullSig: any) {
        return this._addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, 6);
    }
    
    public addResultReferenceCall(_contract:any, _methodAndParams: any, resultIndex: number, _fullSig: any) {
        return this._addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, 7);
    }

    public addCallToResultingAddressCall(_contract:any, _methodAndParams: any, resultIndex: number, _fullSig: any) {
        return this._addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, 2);
    }

    public _addResultReferenceCall(_contract:any, _methodAndParams: any, resultIndex: number, _fullSig: any, type: number) {

        const methodSig = _contract.interface.encodeFunctionData(..._methodAndParams);
        const _key = (_contract.address+"_"+methodSig).toLowerCase();

        if(typeof _fullSig === "undefined") {
            _fullSig = methodSig;
        }

        let count = 0;
        if(typeof this.calls[_key] === "undefined") {
            this.calls[_key] = count;
        } else {
            count = ++this.calls[_key];
        }

        const _newkey = (_contract.address+"_"+methodSig+"_"+count).toLowerCase();
        const oldidentifier = MD5.hash(_key);
        const identifier = MD5.hash(_newkey);
        this.calls[_newkey] = "";

        // console.log("_newkey", _newkey, "oldidentifier", oldidentifier.toString(), "identifier", identifier.toString());

        this.callsData[identifier] = {
            contract: _contract,
            key: _key,
            fullSig: _fullSig,
            type: type,
            resultIndex: resultIndex,
            count: count
        };

        return identifier;
    }

    /** 
     * Decode a call to an address 
     * 
     * @param identifier
     * 
     */
    public decodeCall( identifier: string ) {
        const callDetails = this.callsData[identifier];
        let sig = callDetails.fullSig;
        if(typeof callDetails.decodeSig !== "undefined") {
            sig = callDetails.decodeSig;
        }

        if(callDetails.type === 6 || callDetails.type === 7) {
            const key = callDetails.key+"_"+callDetails.count;
            // console.log("Decode call 6/7", key, this.lastCallData[key])
            return callDetails.contract.interface.decodeFunctionResult(sig, this.lastCallData[key]);
        } else if(callDetails.type === 2) {
            // need to find address value at callDetails.resultIndex
            // so we can build the actual key we're looking for
            const resultKey = Object.keys(this.callsData)[callDetails.resultIndex];
            const resultCallDetails = this.callsData[resultKey];
            let value = resultCallDetails.contract.interface.decodeFunctionResult(resultCallDetails.fullSig, this.lastCallData[resultCallDetails.key]);
            const key = callDetails.key.replace(
                callDetails.key.substring(0, 42),
                value.toString().toLowerCase()
            )

            return callDetails.contract.interface.decodeFunctionResult(sig, this.lastCallData[key]);


        } else {
            console.log("Decode call else", callDetails.key,this.lastCallData[callDetails.key])
            return callDetails.contract.interface.decodeFunctionResult(sig, this.lastCallData[callDetails.key]);
        }
    }

    /** 
     * Read method signature
     * 
     * @param calldata
     * 
     */
     public toMethodSignature( calldata: string ) {

        // strip out 0x
        const cleanBinary = this.removeZeroX(calldata);

        // convert the result to a byte array so we can process it
        const bytes: ByteArray = new ByteArray(
            Buffer.from(cleanBinary, "hex")
        );

        const newBytes: ByteArray = new ByteArray(
            Buffer.from("")
        );
        
        // copy method signature - 4 bytes
        newBytes.copyBytes(bytes, 0, 4);
        return newBytes.toString("hex")
    }
};
