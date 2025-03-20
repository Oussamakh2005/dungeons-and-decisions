"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_genai_1 = require("@langchain/google-genai");
const env_1 = require("../config/env");
const model = new google_genai_1.ChatGoogleGenerativeAI({
    temperature: 1,
    apiKey: env_1.GEMINI_API_KEY,
    model: "gemini-2.0-flash"
});
exports.default = model;
