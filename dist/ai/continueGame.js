import model from "./model.js";
import { continueGameSchema } from "../schema/situation.js";
const continueGame = async (messages) => {
    const response = await model.withStructuredOutput(continueGameSchema).invoke(messages);
    return response;
};
export default continueGame;
