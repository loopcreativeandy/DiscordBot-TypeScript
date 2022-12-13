import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';
import { checkChallenge2 } from "../../gameofdev/checker.js"
import { P } from 'pino';

export class CheckCommand implements Command {
    public names = ["check"];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        let output = "";
        try{
            const mint = intr.options.getString("mint", true);
            const isSave = await checkChallenge2(mint);
            if(isSave){
                output = "Your Hacker is SAVE!";
            } else {
                output = "Your Hacker is NOT save!"
            }
        } catch (e) {
            output = "An error occured! Make sure to provide a valid mint address!";
        }
        await InteractionUtils.send(intr, output);
    }
}

