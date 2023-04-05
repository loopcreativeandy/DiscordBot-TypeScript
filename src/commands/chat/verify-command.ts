import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';
import { check } from "../../solana/gameofdev/checker.js"
import { P } from 'pino';
import { buildUrl } from 'build-url-ts';
import { sign } from 'crypto';
import { verify } from '../../solana/verify/verify.js';
import { getSignupURL } from './signup-command.js';

export class VerifyCommand implements Command {
    public names = ["verify"];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {

        const userID = intr.user.id;
        const userName = intr.user.tag;

        let output;
        const verified = await verify(userID);
        if(!verified){
            const signupURL = getSignupURL(userID, userName);
            output = "Could not verify! Please sign up at "+signupURL;
        } else {
            // provide user with role
            const role = intr.guild.roles.cache.find(role => role.id === "1093208675935604887");
            intr.guild.members.addRole({
                role: role,
                user: intr.user
            })
            output = "Thank you "+userName+"! You are successfully verified! (devnet)"
        }
        await InteractionUtils.send(intr, output);
    }
}

