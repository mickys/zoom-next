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
    const ERC721Address = "0xF1D6A8E031740efE05975162e9C6908aA273D593";

    const provider = new ethers.JsonRpcProvider("https://sepolia.nowlive.ro/");

    const ZoomLibraryInstance = new Zoom2();
    const ZoomContractInstance = new ethers.Contract("0xaeca29502D9260439e009083F45cc2d9F1fA1267", ZoomLibraryInstance.zoomABI, provider);

    const ERC721            = new ethers.Contract(ERC721Address, ERC721_ABI, provider);
    const balance           = await ERC721.balanceOf(walletAddress);
    console.log("balance", balance);

    const tokenIds: any = [];
    
    const start = 0;
    const end = balance;
    
    for(let i = start; i < end; i++) {
        tokenIds[i] = ZoomLibraryInstance.addCall(
            ERC721,
            ERC721Address,
            ["tokenOfOwnerByIndex(address owner, uint256 id)", [walletAddress, i]],
            "function tokenOfOwnerByIndex(address owner, uint256 id) external view returns (uint256)"
        );
    }

    await ZoomLibraryInstance.runZoomCallAndFulfillPromises(ZoomContractInstance, true, console.log);

    for(let i = start; i < end; i++) {
        console.log("token i", i, "has id:", await tokenIds[i]);
    }

}

init();