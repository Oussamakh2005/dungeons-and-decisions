import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GEMINI_API_KEY } from "../config/env.js";
const model = new ChatGoogleGenerativeAI({
    temperature: 1,
    apiKey: GEMINI_API_KEY,
    model: "gemini-2.0-flash"
});
export default model;
