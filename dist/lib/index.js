/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ByteArray
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT
 
 based on https://github.com/Zaseth/bytearray-node
*/

class ByteArray {

	 __init() {this.DEFAULT_SIZE = 2048;}
	 __init2() {this.start_size = 0;}
	 __init3() {this.writePosition = 0;}
	 __init4() {this.readPosition = 0;}
	 __init5() {this.endian = true;}
	

	constructor(buffer ) {ByteArray.prototype.__init.call(this);ByteArray.prototype.__init2.call(this);ByteArray.prototype.__init3.call(this);ByteArray.prototype.__init4.call(this);ByteArray.prototype.__init5.call(this);

		if (buffer instanceof ByteArray) {
			this.buffer = buffer.buffer;
		} else if (Buffer.isBuffer(buffer)) {
			this.buffer = buffer;
		} else {
			if( typeof buffer === "number" ) {
				this.start_size = buffer;
			} else {
				this.start_size = this.DEFAULT_SIZE;
			}
			this.buffer = Buffer.alloc(this.start_size);
		}
	}

	 get bytesAvailable() {
		return this.buffer.length - this.readPosition;
	}

	 get length() {
		return this.buffer.length;
	}

	 clear() {
		this.buffer = Buffer.alloc(this.DEFAULT_SIZE);
		this.reset();
	}

	 reset() {
		this.writePosition = 0;
		this.readPosition = 0;
	}

	 canWrite(length) {
		return this.length - this.writePosition >= length;
	}

	 scaleBuffer(length) {
		const oldBuffer = this.buffer;
		this.buffer = Buffer.alloc(this.length + length);
		oldBuffer.copy(this.buffer);
	}

	 readBoolean() {
		return this.readByte() !== 0;
	}

	 readByte() {
		const value = this.buffer.readInt8(this.readPosition);
		this.readPosition += 1;
		return value;
	}

	 readBytes(buffer, offset = 0, length = 0) {

		if (offset < 0 || length < 0) {
			throw new RangeError("Offset/Length can't be less than 0");
		}

		if (length === 0) {
			length = this.bytesAvailable;
		}

		if (length > this.bytesAvailable) {
			throw new RangeError("Length can't be greater than the bytes available");
		}

		const total = offset + length;

		if (total !== offset + length) {
			throw new RangeError("32-bit overflow");
		}

		if (!buffer.canWrite(offset + length)) {
			buffer.scaleBuffer(offset + length);
		}

		if (length > 0) {
			for (let i = 0; i < length; i++) {
				buffer.writeByte(this.readByte());
			}
		}
	}

	 readDouble() {
		const value = this.endian
			? this.buffer.readDoubleBE(this.readPosition)
			: this.buffer.readDoubleLE(this.readPosition);
		this.readPosition += 8;
		return value;
	}

	 readFloat() {
		const value = this.endian
			? this.buffer.readFloatBE(this.readPosition)
			: this.buffer.readFloatLE(this.readPosition);
		this.readPosition += 4;
		return value;
	}

	 readInt() {
		const value = this.endian
			? this.buffer.readInt32BE(this.readPosition)
			: this.buffer.readInt32LE(this.readPosition);
		this.readPosition += 4;
		return value;
	}

	 readMultiByte(length, charSet = "utf8") {
		const position = this.readPosition;
		this.readPosition += length;
		if (Buffer.isEncoding(charSet)) {
			return this.buffer.toString(charSet, position, position + length);
		} else {
			throw new Error("Cannot read multi byte. Buffer encoding does not match");
		}
	}

	 readShort() {
		const value = this.endian
			? this.buffer.readInt16BE(this.readPosition)
			: this.buffer.readInt16LE(this.readPosition);

		this.readPosition += 2;
		return value;
	}

	 readUnsignedByte() {
		const value = this.buffer.readUInt8(this.readPosition);
		this.readPosition += 1;
		return value;
	}

	 readUnsignedInt() {
		const value = this.endian
			? this.buffer.readUInt32BE(this.readPosition)
			: this.buffer.readUInt32LE(this.readPosition);

		this.readPosition += 4;
		return value;
	}

	 readUnsignedShort() {
		const value = this.endian
			? this.buffer.readUInt16BE(this.readPosition)
			: this.buffer.readUInt16LE(this.readPosition);

		this.readPosition += 2;
		return value;
	}

	 readUTF() {
		const length = this.readShort();
		const position = this.readPosition;
		this.readPosition += length;
		return this.buffer.toString("utf8", position, position + length);
	}

	 readUTFBytes(length) {
		return this.readMultiByte(length);
	}

	 toJSON() {
		return this.buffer.toJSON();
	}

	 toString(charSet = "utf8", offset = 0, length = this.length) {
		return this.buffer.toString(charSet, offset, length);
	}

	 writeBoolean(value) {
		this.writeByte(value ? 1 : 0);
	}

	 writeByte(value) {
		if (!this.canWrite(1)) {
			this.scaleBuffer(1);
		}

		this.buffer.writeInt8(value, this.writePosition);
		this.writePosition += 1;
	}

	 writeBytes(buffer, offset = 0, length = 0) {
		if (offset < 0 || length < 0) {
			throw new Error("Offset/Length can't be less than 0");
		}

		if (offset > buffer.length) {
			offset = buffer.length;
		}

		if (length === 0) {
			length = buffer.length - offset;
		}

		if (length > buffer.length - offset) {
			throw new RangeError("Length can't be greater than the buffer length");
		}

		if (length > 0) {
			for (let i = offset; i < length; i++) {
				this.writeByte(buffer[i]);
			}
		}
	}

	 writeDouble(value) {
		if (!this.canWrite(8)) {
			this.scaleBuffer(8);
		}

		this.endian
			? this.buffer.writeDoubleBE(value, this.writePosition)
			: this.buffer.writeDoubleLE(value, this.writePosition);

		this.writePosition += 8;
	}

	 writeFloat(value) {
		if (!this.canWrite(4)) {
			this.scaleBuffer(4);
		}

		this.endian
			? this.buffer.writeFloatBE(value, this.writePosition)
			: this.buffer.writeFloatLE(value, this.writePosition);

		this.writePosition += 4;
	}

	 writeInt(value) {
		if (!this.canWrite(4)) {
			this.scaleBuffer(4);
		}

		this.endian
			? this.buffer.writeInt32BE(value, this.writePosition)
			: this.buffer.writeInt32LE(value, this.writePosition);

		this.writePosition += 4;
	}

	 writeMultiByte(value, charSet = "utf8") {
		const length = Buffer.byteLength(value);

		if (!this.canWrite(length)) {
			this.scaleBuffer(length);
		}

		if (Buffer.isEncoding(charSet)) {
			this.buffer.write(value, this.writePosition, length, charSet);
			this.writePosition += length;
		}
	}

	 writeShort(value) {
		if (!this.canWrite(2)) {
			this.scaleBuffer(2);
		}

		this.endian
			? this.buffer.writeInt16BE(value, this.writePosition)
			: this.buffer.writeInt16LE(value, this.writePosition);

		this.writePosition += 2;
	}

	 writeUnsignedByte(value) {
		if (!this.canWrite(1)) {
			this.scaleBuffer(1);
		}

		this.buffer.writeUInt8(value, this.writePosition);
		this.writePosition += 1;
	}

	 writeUnsignedInt(value) {
		if (!this.canWrite(4)) {
			this.scaleBuffer(4);
		}

		this.endian
			? this.buffer.writeUInt32BE(value, this.writePosition)
			: this.buffer.writeUInt32LE(value, this.writePosition);

		this.writePosition += 4;
	}

	 writeUnsignedShort(value) {
		if (!this.canWrite(2)) {
			this.scaleBuffer(2);
		}

		this.endian
			? this.buffer.writeUInt16BE(value, this.writePosition)
			: this.buffer.writeUInt16LE(value, this.writePosition);

		this.writePosition += 2;
	}

	 writeUTF(value) {
		const length = Buffer.byteLength(value);

		if (length > 65535) {
			throw new RangeError("Length can't be greater than 65535");
		}

		if (!this.canWrite(length)) {
			this.scaleBuffer(length);
		}

		this.writeUnsignedShort(length);
		this.buffer.write(value, this.writePosition, length);
		this.writePosition += length;
	}

	 writeUTFBytes(value) {
		this.writeMultiByte(value);
	}

	 copyBytes(buffer, offset = 0, length = 0) {
		if (offset < 0 || length < 0) {
			throw new Error("Offset/Length can't be less than 0");
		}

		if (offset > buffer.length) {
			offset = buffer.length;
		}

		if (length === 0) {
			length = buffer.length - offset;
		}

		if (length > buffer.length - offset) {
			throw new RangeError("Length can't be greater than the buffer length");
		}

		if (length > 0) {
			buffer.reset();
			buffer.advanceReadPositionBy(offset);
			for (let i = offset; i < length; i++) {
				this.writeByte(buffer.readByte());
			}
		}
	}

	 advanceReadPositionBy(value) {
		this.readPosition += value;
	}
}

/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ByteArray
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     none
 
 * @based-on    https://stackoverflow.com/questions/1655769/fastest-md5-implementation-in-javascript
*/

class MD5 {

    //  Formatted version of a popular md5 implementation
    //  Original copyright (c) Paul Johnston & Greg Holt.
    //  The function itself is now 42 lines long.
     static hash(inputString) {

        var hc="0123456789abcdef";
        function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
        function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
        function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
        function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
        function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
        function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
        function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
        function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
        function sb(x) {
            var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
            for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
            blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
        }
        var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
        for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
            a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
            b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
            c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
            d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
            a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
            b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
            c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
            d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
            a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
            b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
            c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
            d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
            a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
            b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
            c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
            d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
            a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
            b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
            c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
            d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
            a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
            b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
        }
        return rh(a)+rh(b)+rh(c)+rh(d);
    }
}

/*

 * source       https://github.com/mickys/zoom-next/
 * @name        Zoom Core
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT
 
*/

/**
 * Zoom Constructor options
 * 
 * clone_cache - boolean - "clone or reference the cache variable"
 * use_reference_calls - boolean - replace calls in binary by result reference and offsets
 * 
 */



















class Zoom {

     __init() {this.version = 1;}
     __init2() {this.options = {
        clone_cache: false,
        use_reference_calls: true
    };}

     __init3() {this.cache = {};}
     __init4() {this.calls = {};}
     __init5() {this.callsData = {};}
     __init6() {this.binary = [];}
    
     __init7() {this.methodSigPointers = [];}

     __init8() {this.lastMappingCountCallID = 0;}

     __init9() {this.addressInAnyResultCache = {};}

    /**
     * 
     * @param {options} - ZoomOptions
     */
    constructor(options) {Zoom.prototype.__init.call(this);Zoom.prototype.__init2.call(this);Zoom.prototype.__init3.call(this);Zoom.prototype.__init4.call(this);Zoom.prototype.__init5.call(this);Zoom.prototype.__init6.call(this);Zoom.prototype.__init7.call(this);Zoom.prototype.__init8.call(this);Zoom.prototype.__init9.call(this);
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
     getZoomCall(cache) {

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
     addZoomHeader(data) {

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
     getBinaryCall() {

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
      generateBinaryCalls() {

        let callIndex = 0;
        this.binary = [];

        Object.keys(this.cache).forEach((call, idx) => {
            // console.log("idx", idx)
            const str = call.split("_");
            // split address from data
            const callToAddress = str[0];
            const callDataString = str[1];
            let count;
            if(typeof str[2] !== "undefined") {
                count = str[2];
            }

            
            // convert our hex string to a buffer so we can actually use it
            const callData = new ByteArray( Buffer.from(this.removeZeroX(callDataString), "hex") );

            const packet = {
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

                        // previous call always.
                        const resultId = callIndex - 1;
                        packet.type = 2;
                        packet.toAddress = new ByteArray(Buffer.alloc(0));
                        packet.resultId = resultId;
                        packet.offset = this.callsData[identifier].resultIndex * 32;
                       

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

                    callIndex++;
                }
                
                // console.log("encoded:", idx, callIndex, this.binary.length, packet.type, this.createBinaryCallByteArray(packet, callData).toString("hex"));

                this.binary.push(this.createBinaryCallByteArray(packet, callData));
            }
        });
    }

     setMethodSigPointer(sig, nr) {
        this.methodSigPointers[sig] = nr;
    }

     getMethodSigPointer(sig) {
        return this.methodSigPointers[sig];
    }


    /** 
     * create binary call byte array
     * 
     * @param packet - {@link (packetFormat:interface)}
     * @param callData - Buffer containing method sha and hex encoded parameter values
     * @returns {ByteArray}
     */
     createBinaryCallByteArray(packet, callData) {

        const bytes = new ByteArray(Buffer.alloc(8));

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
     removeZeroX(string) {
        return string.replace("0x", "");
    }

    /** 
     * Group calls by "to" address
     */
     groupCalls() {
        Object.keys(this.cache).forEach((key) => {
            const parts = key.split("_");
            const toAddress = parts[0];
            const toCall = parts[1];

            if (!this.calls.hasOwnProperty(toAddress)) {
                this.calls[toAddress] = [];
            }

            this.calls[toAddress].push(toCall);
        });
    }


     determineResultPositionByte() {

    }

    /** 
     * Search current calls for the "to address" and if found return index and byte offset
     * 
     * @param to - the call address
     * 
     * @returns { addressInResult }
     */
     findToAddressInAnyResult(to) {

        if (typeof this.addressInAnyResultCache[to] === "undefined") {

            const cleanTo = this.removeZeroX(to);
            const Result = {
                callNum: 0,
                bytePosition: 0,
                found: false,
            };

            Object.keys(this.cache).some((key, index) => {
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
     resultsToCache(callResult, combinedBinaryCall) {

        const newData = {};

        const resultString = this.removeZeroX(callResult[0]);
        const resultOffsets = this.readOffsets(callResult[1]);

        // push resultString length as last offset, so we can the last result
        resultOffsets.push(resultString.length / 2);

        const bytes = new ByteArray(combinedBinaryCall);

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

            let toAddress;

            if (type === 1 || type === 3 || type === 4 || type === 5 || type === 6 || type === 7) {
                
                // bypass 5 bytes used in type 2 for result id and offset and 1 byte for unused space
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

     toBuffer(string) {
        return Buffer.from(string, "hex");
    }

     readOffsets(binaryString) {

        // strip out 0x
        const cleanBinary = this.removeZeroX(binaryString);

        // convert the result to a byte array so we can process it
        const bytes = new ByteArray(
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
            );
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
     addCall(_contract, _methodAndParams, _fullSig) {

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

     addType4Call(_contract, _methodAndParams, _fullSig) {
        return this.addTypeCall(4, _contract, _methodAndParams, _fullSig);
    }

     addType5Call(_contract, _methodAndParams, _fullSig) {
        return this.addTypeCall(5, _contract, _methodAndParams, _fullSig);
    }

     addTypeCall(_type, _contract, _methodAndParams, _fullSig) {

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
     addMappingCountCall(_contract, _methodAndParams, _fullSig, sigs) {

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
    
     addResultReferenceCountedCall(_contract, _methodAndParams, resultIndex, _fullSig) {
        return this._addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, 6);
    }
    
     addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig) {
        return this._addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, 7);
    }

     _addResultReferenceCall(_contract, _methodAndParams, resultIndex, _fullSig, type) {

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
        MD5.hash(_key);
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
     decodeCall( identifier ) {
        const callDetails = this.callsData[identifier];
        let sig = callDetails.fullSig;
        if(typeof callDetails.decodeSig !== "undefined") {
            sig = callDetails.decodeSig;
        }

        if(callDetails.type === 6 || callDetails.type === 7) {
            const key = callDetails.key+"_"+callDetails.count;
            // console.log("Decode call 6/7", key, this.lastCallData[key])
            return callDetails.contract.interface.decodeFunctionResult(sig, this.lastCallData[key]);
        } else {
            // console.log("Decode call else", callDetails.key,this.lastCallData[callDetails.key])
            return callDetails.contract.interface.decodeFunctionResult(sig, this.lastCallData[callDetails.key]);
        }
    }

    /** 
     * Read method signature
     * 
     * @param calldata
     * 
     */
      toMethodSignature( calldata ) {

        // strip out 0x
        const cleanBinary = this.removeZeroX(calldata);

        // convert the result to a byte array so we can process it
        const bytes = new ByteArray(
            Buffer.from(cleanBinary, "hex")
        );

        const newBytes = new ByteArray(
            Buffer.from("")
        );
        
        // copy method signature - 4 bytes
        newBytes.copyBytes(bytes, 0, 4);
        return newBytes.toString("hex")
    }
}

/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/





if (typeof window !== 'undefined') {
    window.ZoomMin = window.ZoomMin || {};
    window.ZoomMin.Zoom = Zoom;
    window.ZoomMin.ByteArray = ByteArray;
}

export { ByteArray, Zoom };
