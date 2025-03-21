import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { PORT } from "./config/env.js";
import path from "path";
import startGame from "./ai/startGame.js";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createNewStory, systemSetRole } from "./data/prompts.js";
import continueGame from "./ai/continueGame.js";
const app = express();
app.use(express.static(path.join(process.cwd(), "public")));
app.get('/game', (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "game.html"));
});
const httpServer = createServer(app);
const io = new Server(httpServer);
io.on('connection', async (socket) => {
    const history = [new SystemMessage(systemSetRole), new HumanMessage(createNewStory)];
    const game = await startGame(history);
    history.push(new AIMessage(game.story));
    socket.emit('start', game);
    socket.on('decision', async (decision) => {
        history.push(new HumanMessage(decision));
        const data = await continueGame(history);
        history.push(new AIMessage(data.situation));
        socket.emit('update', data);
    });
});
httpServer.listen(PORT);
