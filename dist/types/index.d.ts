import Zoom from "./zoom/core";
import ByteArray from "./utils/ByteArray";
declare global {
    interface Window {
        ZoomMin: any;
    }
}
export { Zoom, ByteArray, };
