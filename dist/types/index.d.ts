import Zoom from "./zoom/core";
import Zoom2 from "./zoom/core2";
import ByteArray from "./utils/ByteArray";
declare global {
    interface Window {
        ZoomMin: any;
    }
}
export { Zoom, Zoom2, ByteArray, };
