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
        // addItem("s10", address(0x10), 10, 10, true);
        // addItem("s11", address(0x10), 10, 10, true);
        // addItem("s12", address(0x10), 10, 10, true);

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
