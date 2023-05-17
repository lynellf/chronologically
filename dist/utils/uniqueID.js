"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniqueID(size = 21) {
    // GPT-4 generated
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.default = uniqueID;
//# sourceMappingURL=uniqueID.js.map