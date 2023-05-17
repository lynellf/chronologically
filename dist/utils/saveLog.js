"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
function saveLog(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config: { logOutDir }, log } = context;
        if (logOutDir) {
            yield (0, promises_1.writeFile)(logOutDir, JSON.stringify(log), "utf-8");
        }
    });
}
exports.default = saveLog;
//# sourceMappingURL=saveLog.js.map