import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';
import { checkChallenge1, checkChallenge2, checkChallenge3} from "../../gameofdev/checker.js"
import { P } from 'pino';

export class CheckCommand implements Command {
    public names = ["check"];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    private async check(challenge: number, mint: string) : Promise<boolean>{
        switch(challenge){
            case 1: 
                return await checkChallenge1(mint);
            case 2: 
                return await checkChallenge2(mint);
            case 3: 
                return await checkChallenge3(mint);

            
        }
    }

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        let output = "";
        try{
            const mint = intr.options.getString("mint", true);
            const challenge = intr.options.getInteger("challenge", true);
            output = "Challenge "+challenge+": ";
            
            const isSave = await this.check(challenge, mint);
            if(isSave){
                output += "Your Hacker is SAVE!";
            } else {
                output += "Your Hacker is NOT save!"
            }
        } catch (e) {
            output = "An error occured! Make sure to provide a valid mint address and challenge id!";
        }
        await InteractionUtils.send(intr, output);
    }
}

