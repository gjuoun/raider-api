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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = __importStar(require("./logger"));
const character_1 = require("./character");
const raider_io_1 = require("./raider.io");
const app = express_1.default();
exports.logger = logger_1.default.getConsoleLogger("Raider.io", logger_1.LOGGING_LEVEL.SILLY);
// https://raider.io/api/search?term=muchgrace
const searchBaseUrl = `https://raider.io/api/search?`;
app.get('/character', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const response = yield axios_1.default.get(`${searchBaseUrl}term=${name}`);
    let matches = response.data.matches;
    if (matches.length < 1) {
        return res.send({ success: false, message: `${name} does not exist.` });
    }
    // get char relative urls
    const urls = character_1.generateCharUrls(matches);
    try {
        const details = yield Promise.all(lodash_1.default.map(urls, (url) => {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const detail = yield character_1.getCharacterDetail(url);
                    resolve(detail);
                }
                catch (_a) {
                    reject();
                }
            }));
        }));
        res.send({ success: true, data: details });
    }
    catch (e) {
        res.send({ success: false, message: "Error: too much same name characters" });
    }
}));
app.get('/raider', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const messages = yield raider_io_1.getRaiderMessages(name);
    res.send({
        success: true,
        data: messages
    });
}));
const PORT = process.env.PORT || 6005;
app.listen(6005, () => {
    exports.logger.info('Server is running at ' + PORT);
});
//# sourceMappingURL=app.js.map