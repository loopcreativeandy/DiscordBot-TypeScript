import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class JoinCommand implements Command {
    public names = ["join"];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        
        const role = intr.guild.roles.cache.find(role => role.id === "1049625253845946439");
        intr.guild.members.addRole({
            role: role,
            user: intr.user
        })
        await InteractionUtils.send(intr, "Welcome to The Game of Dev <@"+intr.user+">");
    }
}
