import z from 'zod';
export const continueGameSchema = z.object({
    situation: z.string().describe("next game situation for the player after he add his decision"),
    decisions: z.array(z.string()).describe(" contain three decisions for the player descripe what can he  do if the game end it equal empty array "),
    end: z.boolean().describe("equal true if the game end and false if it continue"),
});
export const startGameSchema = z.object({
    story: z.string().describe("game story and first situation"),
    decisions: z.array(z.string()).length(3).describe("player dedecisions what can the player do "),
});
