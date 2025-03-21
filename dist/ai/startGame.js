import model from "./model.js";
import { startGameSchema } from "../schema/situation.js";
const startGame = async (messages) => {
    const response = await model.withStructuredOutput(startGameSchema).invoke(messages);
    return response;
};
export default startGame;
