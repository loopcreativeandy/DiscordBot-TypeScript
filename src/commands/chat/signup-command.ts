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

export function getSignupURL(userID, userName){

    const signupURL = buildUrl("https://discord-verification-loopcreativeandy.vercel.app", {
        path: 'signup',
        queryParams: {
            uid: userID,
            name: userName
        }
    });
    return signupURL;
}

export class SignupCommand implements Command {
    public names = ["signup"];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {

        const userID = intr.user.id;
        const userName = intr.user.tag;
        const signupURL = getSignupURL(userID, userName);

        let output = "Follow this link to sign up: "+signupURL;
        await InteractionUtils.send(intr, output);
    }
}

