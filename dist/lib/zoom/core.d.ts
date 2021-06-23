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
export default class Zoom {
    version: number;
    options: ZoomOptions;
    cache: {};
    calls: {};
    callsData: {};
    binary: any;
    lasCallData: any;
    methodSigPointers: [];
    private addressInAnyResultCache;
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
    addCall(_contract: any, _methodAndParams: any, _fullSig?: string): any;
    addType4Call(_contract: any, _methodAndParams: any, _fullSig?: string): any;
    /**
     * Add a special view call
     *
     * @param _contract
     * @param type
     *
     */
    addMappingCountCall(_contract: any, _methodAndParams: any, _fullSig: any, _mapAndParams: any): any;
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
    readMethodSignature(calldata: string): string;
}
export {};
