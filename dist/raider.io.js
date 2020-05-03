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
const lodash_1 = __importDefault(require("lodash"));
const classSymbols = new Map([
    ["death-knight", "👻"],
    ["demon-hunter", "👾"],
    ["druid", "🐻"],
    ["hunter", "🐯"],
    ["mage", "🦄"],
    ["monk", "🐲"],
    ["paladin", "🐴"],
    ["priest", "🦓"],
    ["rogue", "🐱"],
    ["shaman", "🐋"],
    ["warlock", "🤢"],
    ["warrior", "😈"],
]);
const factionDic = new Map([["horde", "部落"], ["alliance", "联盟"]]);
const classDic = new Map([
    ["death-knight", "死骑"],
    ["demon-hunter", "DH"],
    ["druid", "小德"],
    ["hunter", "猎人"],
    ["mage", "法爷"],
    ["monk", "武僧"],
    ["paladin", "骑士"],
    ["priest", "牧师"],
    ["rogue", "贼"],
    ["shaman", "萨满"],
    ["warlock", "术士"],
    ["warrior", "战士"],
]);
const specDic = new Map([
    ["blood", "鲜血"],
    ["frost", "冰霜"],
    ["unholy", "邪恶"],
    ["havoc", "浩劫"],
    ["vengeance", "复仇"],
    ["balance", "平衡"],
    ["feral", "野性"],
    ["guardian", "守护"],
    ["restoration", "恢复"],
    ["beast-mastery", "兽王"],
    ["marksmanship", "射击"],
    ["survival", "生存"],
    ["arcane", "奥数"],
    ["fire", "火焰"],
    // ["frost", "冰霜"],
    ["brewmaster", "酒仙"],
    ["mistweaver", "织雾"],
    ["windwalker", "踏风"],
    ["holy", "神圣"],
    ["protection", "防护"],
    ["retribution", "惩戒"],
    ["discipline", "戒律"],
    ["holy", "神圣"],
    ["shadow", "暗影"],
    ["assassination", "奇袭"],
    ["outlaw", "狂徒"],
    ["subtlety", "敏锐"],
    ["elemental", "元素"],
    ["enhancement", "增强"],
    // ["restoration", "恢复"],
    ["affliction", "痛苦"],
    ["demonology", "恶魔"],
    ["destruction", "毁灭"],
    ["arms", "武器"],
    ["fury", "狂怒"],
    ["protection", "防护"],
]);
function getDetails(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`http://localhost:6005/character?name=${name}`);
        const details = response.data.data;
        return details;
    });
}
function getRaiderMsg(char) {
    // console.log(char)
    const name = char.character.name;
    const charClass = char.character.class.slug;
    const charRace = char.character.race.slug;
    const charFaction = char.character.faction;
    const charLevel = char.character.level;
    // "path": "/characters/us/illidan/Somuchgrace",
    const charPath = `https://raider.io${char.character.path}`;
    const charRealm = char.character.realm.name;
    const charItemLevel = char.character.itemLevelEquipped;
    const charAchievementPoints = char.character.achievementPoints;
    const charSpec = char.character.spec.slug;
    const charTalents = parseInt(char.character.talents) + 1111111;
    const charDpsScore = Math.round(char.mythicPlusScores.dps.score);
    const charTankScore = Math.round(char.mythicPlusScores.tank.score);
    const charHealerScore = Math.round(char.mythicPlusScores.healer.score);
    let msg = "";
    msg += `[${name}] - ${charRealm}${factionDic.get(charFaction)}\n`;
    msg += `${charLevel}级 ${classSymbols.get(charClass)}${specDic.get(charSpec)}${classDic.get(charClass)}\n`;
    msg += `💎天赋: ${charTalents}\n`;
    msg += `🥼物品Lvl: ${charItemLevel}\n`;
    msg += `🎉成就: ${charAchievementPoints}\n`;
    msg += `🐛Raider: 🗡${charDpsScore} 🛡${charTankScore} 🍀${charHealerScore}\n`;
    msg += `详情:`;
    msg += `${charPath}`;
    return { text: msg, realm: charRealm };
}
function getRaiderMessages(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield getDetails(name);
        const messages = lodash_1.default.map(details, getRaiderMsg);
        return messages;
    });
}
exports.getRaiderMessages = getRaiderMessages;
//# sourceMappingURL=raider.io.js.map