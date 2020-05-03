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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
//https://raider.io/api/characters/eu/sanguino/Trator?season=season-bfa-4&tier=25
const characterAPIBaseUrl = `https://raider.io/api/characters`;
function generateCharUrls(searchResults) {
    const characterSearchResults = [];
    // get character searchResults
    for (let result of searchResults) {
        if (result.type === 'character') {
            characterSearchResults.push(result.data);
        }
    }
    let charUrls = [];
    //assemble char urls like 'us/illidan/muchgrace'
    for (let charResult of characterSearchResults) {
        const region = charResult.region.slug;
        const realm = charResult.realm.slug;
        const charName = charResult.name;
        charUrls.push(`${region}/${realm}/${charName}`);
    }
    // only return top 3 results
    if (charUrls.length > 3) {
        charUrls = charUrls.slice(0, 3);
    }
    return charUrls;
}
exports.generateCharUrls = generateCharUrls;
// expect 'eu/sanguino/Trator?season=season-bfa-4&tier=25'
function getCharacterDetail(charPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestUrl = `${characterAPIBaseUrl}/${charPath}?season=season-bfa-4&tier=25`;
            const response = yield axios_1.default.get(requestUrl);
            const characterDetail = response.data.characterDetails;
            return characterDetail;
        }
        catch (e) {
            throw new Error("Having trouble fetching character: " + charPath);
        }
    });
}
exports.getCharacterDetail = getCharacterDetail;
// (async () => {
// await getCharacterDetail(`us/illidan/Muchgrace`)
// })()
//# sourceMappingURL=character.js.map