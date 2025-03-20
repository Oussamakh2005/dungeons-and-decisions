"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const env_1 = require("./config/env");
const path_1 = __importDefault(require("path"));
const startGame_1 = __importDefault(require("./ai/startGame"));
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("./data/prompts");
const continueGame_1 = __importDefault(require("./ai/continueGame"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.get('/game', (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "game.html"));
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
io.on('connection', async (socket) => {
    const history = [new messages_1.SystemMessage(prompts_1.systemSetRole), new messages_1.HumanMessage(prompts_1.createNewStory)];
    const game = await (0, startGame_1.default)(history);
    history.push(new messages_1.AIMessage(game.story));
    socket.emit('start', game);
    socket.on('decision', async (decision) => {
        history.push(new messages_1.HumanMessage(decision));
        const data = await (0, continueGame_1.default)(history);
        history.push(new messages_1.AIMessage(data.situation));
        socket.emit('update', data);
    });
});
httpServer.listen(env_1.PORT);
