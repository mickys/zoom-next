/// <reference types="node" />
import ByteArray from "../utils/ByteArray";
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
interface packetFormat {
    type: number;
    dataLength: number;
    resultId: number;
    offset: number;
    toAddress: ByteArray;
}
export default class Zoom2 {
    version: number;
    options: ZoomOptions;
    cache: {};
    calls: {};
    callsData: {};
    binary: any;
    lastCallData: any;
    methodSigPointers: [];
    lastMappingCountCallID: number;
    private addressInAnyResultCache;
    resolvers: any;
    zoomABI: string[];
    /**
     *
     * @param {options} - ZoomOptions
     */
    constructor(options?: ZoomOptions);
    /**
     * Assign cache and build the binary call
     *
     * @param {cache} - ZoomOptions
     * @returns Buffer containing resulting call
     */
    getZoomCall(cache?: {}): any;
    /**
     * Concatenate all binary calls we have into one large string
     * @param data - the string containing all the calls we want to make
     * @returns string
     */
    addZoomHeader(data: string): string;
    /**
     * Concatenate all binary calls we have into one large string
     * @returns string
     */
    getBinaryCall(): string;
    /**
     * Iterate through our calls and create binaries
     */
    generateBinaryCalls(): void;
    setMethodSigPointer(sig: string, nr: number): void;
    getMethodSigPointer(sig: string): any;
    /**
     * create binary call byte array
     *
     * @param packet - {@link (packetFormat:interface)}
     * @param callData - Buffer containing method sha and hex encoded parameter values
     * @returns {ByteArray}
     */
    createBinaryCallByteArray(packet: packetFormat, callData: ByteArray): ByteArray;
    /**
     * Remove 0x from string then return it
     * @param string
     * @returns string
     */
    removeZeroX(string: string): string;
    /**
     * Group calls by "to" address
     */
    groupCalls(): void;
    determineResultPositionByte(): void;
    /**
     * Search current calls for the "to address" and if found return index and byte offset
     *
     * @param to - the call address
     *
     * @returns { addressInResult }
     */
    findToAddressInAnyResult(to: string): any;
    /**
     * Converts the binary returned by the Zoom Smart contract back into a cache object
     *
     * @param binaryString
     *
     * @returns new cache object
     */
    resultsToCache(callResult: any, combinedBinaryCall: Buffer): {};
    toBuffer(string: any): Buffer;
    private readOffsets;
    /**
     * Add a call to an address
     *
     * @param _contract
     * @param _methodAndParams
     * @param _fullSig
     *
     * @returns call indentifier
     */
    addCall(_contract: any, _contractAddress: string, _methodAndParams: any, _fullSig?: string): Promise<string>;
    addResolver(identifier: string): Promise<any>;
    addType4Call(_contract: any, _methodAndParams: any, _fullSig?: string): Promise<string>;
    addType5Call(_contract: any, _methodAndParams: any, _fullSig?: string): Promise<string>;
    addTypeCall(_type: number, _contract: any, _contractAddress: string, _methodAndParams: any, _fullSig?: string): Promise<string>;
    /**
     * Add a special view call
     *
     * @param _contract
     * @param type
     *
     */
    addMappingCountCall(_contract: any, _methodAndParams: any, _fullSig: any, sigs: any[]): Promise<string>;
    /**
     * Add a special view call
     *
     * @param _contract
     * @param type
     *
     */
    addResultReferenceCountedCall(_contract: any, _methodAndParams: any, resultIndex: number, _fullSig: any): Promise<string>;
    addResultReferenceCall(_contract: any, _methodAndParams: any, resultIndex: number, _fullSig: any): Promise<string>;
    addCallToResultingAddressCall(_contract: any, _methodAndParams: any, resultIndex: number, _fullSig: any): Promise<string>;
    _addResultReferenceCall(_contract: any, _methodAndParams: any, resultIndex: number, _fullSig: any, type: number): Promise<string>;
    /**
     * Decode a call to an address
     *
     * @param identifier
     *
     */
    decodeCall(identifier: string): any;
    /**
     * Read method signature
     *
     * @param calldata
     *
     */
    toMethodSignature(calldata: string): string;
    runZoomCallAndFulfillPromises(ZoomContractInstance: any, reset?: boolean, debugFn?: Function | false): Promise<void>;
    reset(): void;
}
export {};
