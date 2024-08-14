/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/
import { Zoom2 } from "../../src/index";
import { ethers } from 'ethers';

const ERC721_ABI       = [
    "function balanceOf(address target) external view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 id) external view returns (uint256)",
]

async function init() {

    const walletAddress = "0x51eD19819B5a960B4B3aDfeDEedCeCaB51953010";

    // contract address
    const ERC721AddressA = "0xF1D6A8E031740efE05975162e9C6908aA273D593";
    const ERC721AddressB = "0xa65d33fb21f64942679f44b05bcf8f71b60cd233";

    const provider = new ethers.JsonRpcProvider("https://sepolia.nowlive.ro/");

    const ZoomLibraryInstance = new Zoom2();
    const ZoomContractInstance = new ethers.Contract("0xaeca29502D9260439e009083F45cc2d9F1fA1267", ZoomLibraryInstance.zoomABI, provider);

    const ERC721_A            = new ethers.Contract(ERC721AddressA, ERC721_ABI, provider);
    const ERC721_B            = new ethers.Contract(ERC721AddressB, ERC721_ABI, provider);
    

    const balanceA = ZoomLibraryInstance.addCall(
        ERC721_A,
        ERC721AddressA,
        ["balanceOf(address owner)", [walletAddress]],
        "function balanceOf(address target) external view returns (uint256)"
    );
    const balanceB = ZoomLibraryInstance.addCall(
        ERC721_B,
        ERC721AddressB,
        ["balanceOf(address owner)", [walletAddress]],
        "function balanceOf(address target) external view returns (uint256)"
    );
    await ZoomLibraryInstance.runZoomCallAndFulfillPromises(ZoomContractInstance, true, console.log);


    console.log("balance A", await balanceA);
    console.log("balance B", await balanceB);

    
    const tokenIdsA: any = [];
    const tokenIdsB: any = [];
    
    
    for(let i = 0; i < parseInt(await balanceA); i++) {
        tokenIdsA[i] = ZoomLibraryInstance.addCall(
            ERC721_A,
            ERC721AddressA,
            ["tokenOfOwnerByIndex(address owner, uint256 id)", [walletAddress, i]],
            "function tokenOfOwnerByIndex(address owner, uint256 id) external view returns (uint256)"
        );
    }
    for(let i = 0; i < parseInt(await balanceB); i++) {
        tokenIdsB[i] = ZoomLibraryInstance.addCall(
            ERC721_A,
            ERC721AddressB,
            ["tokenOfOwnerByIndex(address owner, uint256 id)", [walletAddress, i]],
            "function tokenOfOwnerByIndex(address owner, uint256 id) external view returns (uint256)"
        );
    }

    await ZoomLibraryInstance.runZoomCallAndFulfillPromises(ZoomContractInstance, true, console.log);

    
    for(let i = 0; i < parseInt(await balanceA); i++) {
        console.log("token A i", i, "has id:", await tokenIdsA[i]);
    }

    for(let i = 0; i < parseInt(await balanceB); i++) {
        console.log("token B i", i, "has id:", await tokenIdsB[i]);
    }

}

init();