/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/

import Zoom from "./zoom/core";
import ByteArray from "./utils/ByteArray";
import HttpProvider from "./utils/HttpProvider";
import WsProvider from "./utils/WsProvider";

declare global {
    interface Window { ZoomMin: any; }
}

if (typeof window !== 'undefined') {
    window.ZoomMin = window.ZoomMin || {};
    window.ZoomMin.Zoom = Zoom;
    window.ZoomMin.ByteArray = ByteArray;
    window.ZoomMin.HttpProvider = HttpProvider;
    window.ZoomMin.WsProvider = WsProvider;
}

export {
    Zoom,
    ByteArray,
    HttpProvider,
    WsProvider
};
