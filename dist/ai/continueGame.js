"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const situation_1 = require("../schema/situation");
const continueGame = async (messages) => {
    const response = await model_1.default.withStructuredOutput(situation_1.continueGameSchema).invoke(messages);
    return response;
};
exports.default = continueGame;
