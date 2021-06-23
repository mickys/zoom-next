
import bitwise from 'bitwise'
import { ethers } from "hardhat";
const BigNumber = ethers.BigNumber;

export default class BitArray {

    public length:number;
    public backingArray: Uint8Array;

    constructor(length: number) {
        this.length = Math.ceil(length/8);
        this.backingArray = Uint8Array.from({length: this.length}, ()=>0)
        this.length = this.length * 8;
    }

    public set(array: any ) {
        for(let i = 0; i < array.length; i++) {
            if(array[i] == 1) {
                this.on(i);
            }
        }
    }

    public get(n: number) {
        return (this.backingArray[n/8|0] & 1 << n % 8) != 0;
    }

    public on(n: number) {
        this.backingArray[n/8|0] |= 1 << n % 8;
    }

    public off(n: number) {
        this.backingArray[n/8|0] &= ~(1 << n % 8);
    }

    public toggle(n: number) {
        this.backingArray[n/8|0] ^= 1 << n % 8;
    }

    forEach(callback: any) {
        this.backingArray.forEach((number, container) => {
            const max = container == this.backingArray.length-1 && this.length%8 ? this.length%8 : 8;
            for(let x=0; x<max; x++) {
                callback((number & 1<<x)!=0, 8*container+x)
            }
        })
    }

    public toHexString() {
        const bn = BigNumber.from(this.backingArray);
        return bn.toHexString();
    }

    public toArray() {
        const retVal: Array<any> = [];
            this.backingArray.forEach(uint8 => {
                retVal.push(uint8)
            });
        return retVal;
    }

    public toBinaryString(spacer: string = ' ') {
        let results: Array<string> = [];
        this.backingArray.forEach(uint8 => {
            let result: string = "";
            for(let j = 0; j < 8 ; j++) {
                result += bitwise.integer.getBit(uint8, j);
            }
            results.push(result);
        })

        return results.join(spacer);
    }

    public static fromHexString(data: string) {
        const Uint8Array = ethers.utils.arrayify(data);
        const BA = new BitArray(Uint8Array.length * 8);
        for(let i = 0; i < Uint8Array.length; i++) {

            for(let j = 0; j < 8 ; j++) {
                const pos = (i * 8) + j;
                const bit = bitwise.integer.getBit(Uint8Array[i], j);
                if(bit === 1) {
                    BA.on(pos);
                }
            }
        }
        return BA;
    }

    public static fromUint8Array(data: Array<any>) {
        if(data.length === 0) {
            data = [0];
        }
        const Uint8Array = ethers.utils.arrayify(data);
        const BA = new BitArray(Uint8Array.length * 8);
        for(let i = 0; i < Uint8Array.length; i++) {

            for(let j = 0; j < 8 ; j++) {
                const pos = (i * 8) + j;
                const bit = bitwise.integer.getBit(Uint8Array[i], j);
                if(bit === 1) {
                    BA.on(pos);
                }
            }
        }
        return BA;
    }
    
}