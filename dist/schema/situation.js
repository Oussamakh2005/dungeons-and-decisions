"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGameSchema = exports.continueGameSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.continueGameSchema = zod_1.default.object({
    situation: zod_1.default.string().describe("next game situation for the player after he add his decision"),
    decisions: zod_1.default.array(zod_1.default.string()).describe(" contain three decisions for the player descripe what can he  do if the game end it equal empty array "),
    end: zod_1.default.boolean().describe("equal true if the game end and false if it continue"),
});
exports.startGameSchema = zod_1.default.object({
    story: zod_1.default.string().describe("game story and first situation"),
    decisions: zod_1.default.array(zod_1.default.string()).length(3).describe("player dedecisions what can the player do "),
});
