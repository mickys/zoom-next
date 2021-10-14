//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

/*

 * source       https://github.com/mickys/zoom-next/
 * @name        MappedStructs
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT
 
*/

contract MappedStructs {

    struct ItemStruct {
        string  _string;
        address _address;
        uint256 _uint256;
        uint16  _uint16;
        bool    _bool;
    }

    mapping(uint256 => ItemStruct) public itemMap;
    uint256                        public itemCount;

    mapping(uint256 => address)    public uintToAddrMap;
    mapping(address => uint256)    public addrToUintMap;

    constructor () {

        addItem("s1", address(0x01), 1, 1, true);
        addItem("s2", address(0x02), 2, 2, true);
        addItem("s3", address(0x03), 3, 3, true);
        addItem("s4", address(0x04), 4, 4, true);
        addItem("s5", address(0x05), 5, 5, true);
        addItem("s6", address(0x06), 6, 6, true);
        addItem("s7", address(0x07), 7, 7, true);
        addItem("s8", address(0x08), 8, 8, true);
        addItem("s9", address(0x09), 9, 9, true);

        uintToAddrMap[1] = address(0x01); 
        uintToAddrMap[2] = address(0x02); 
        uintToAddrMap[3] = address(0x03); 
        uintToAddrMap[4] = address(0x04); 
        uintToAddrMap[5] = address(0x05); 
        uintToAddrMap[6] = address(0x06); 
        uintToAddrMap[7] = address(0x07); 
        uintToAddrMap[8] = address(0x08); 
        uintToAddrMap[9] = address(0x09); 

        addrToUintMap[address(0x01)] = 11; 
        addrToUintMap[address(0x02)] = 22; 
        addrToUintMap[address(0x03)] = 33; 
        addrToUintMap[address(0x04)] = 44; 
        addrToUintMap[address(0x05)] = 55; 
        addrToUintMap[address(0x06)] = 66; 
        addrToUintMap[address(0x07)] = 77; 
        addrToUintMap[address(0x08)] = 88; 
        addrToUintMap[address(0x09)] = 99; 
    }

    function getItemAddr(uint16 index) public view returns (address) {
        return uintToAddrMap[index];
    }

    function getItemValForAddress(address _addr) public view returns (uint256) {
        return addrToUintMap[_addr];
    }

    function addItem(string memory _str, address _addr, uint256 _uint256, uint16 _uint16, bool _bool ) public {
        ItemStruct storage newItem = itemMap[++itemCount];
        newItem._string     = _str;
        newItem._address    = _addr;
        newItem._uint256    = _uint256;
        newItem._uint16     = _uint16;
        newItem._bool       = _bool;
    }

}
