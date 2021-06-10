"use strict";
/*

 * source       https://github.com/mickys/zoom-next/
 * @name        ZoomNext
 * @package     ZoomNext
 * @author      Micky Socaci <micky@binarzone.com>
 * @license     MIT

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./zoom/core"));
exports.Zoom = core_1.default;
var ByteArray_1 = __importDefault(require("./utils/ByteArray"));
exports.ByteArray = ByteArray_1.default;
var HttpProvider_1 = __importDefault(require("./utils/HttpProvider"));
exports.HttpProvider = HttpProvider_1.default;
var WsProvider_1 = __importDefault(require("./utils/WsProvider"));
exports.WsProvider = WsProvider_1.default;
if (typeof window !== 'undefined') {
    window.ZoomMin = window.ZoomMin || {};
    window.ZoomMin.Zoom = core_1.default;
    window.ZoomMin.ByteArray = ByteArray_1.default;
    window.ZoomMin.HttpProvider = HttpProvider_1.default;
    window.ZoomMin.WsProvider = WsProvider_1.default;
}
//# sourceMappingURL=index.js.map