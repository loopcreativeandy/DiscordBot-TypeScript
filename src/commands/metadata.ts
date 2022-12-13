import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

import { Language } from '../models/enum-helpers/index.js';
import { Lang } from '../services/index.js';
import { Args } from './index.js';

export const ChatCommandMetadata: {
    [command: string]: RESTPostAPIChatInputApplicationCommandsJSONBody;
} = {
    HELP: {
        type: ApplicationCommandType.ChatInput,
        name: Lang.getRef('chatCommands.help', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('chatCommands.help'),
        description: Lang.getRef('commandDescs.help', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('commandDescs.help'),
        dm_permission: true,
        default_member_permissions: undefined,
        options: [
            {
                ...Args.HELP_OPTION,
                required: true,
            },
        ],
    },
    // INFO: {
    //     type: ApplicationCommandType.ChatInput,
    //     name: Lang.getRef('chatCommands.info', Language.Default),
    //     name_localizations: Lang.getRefLocalizationMap('chatCommands.info'),
    //     description: Lang.getRef('commandDescs.info', Language.Default),
    //     description_localizations: Lang.getRefLocalizationMap('commandDescs.info'),
    //     dm_permission: true,
    //     default_member_permissions: undefined,
    //     options: [
    //         {
    //             ...Args.INFO_OPTION,
    //             required: true,
    //         },
    //     ],
    // },
    // TEST: {
    //     type: ApplicationCommandType.ChatInput,
    //     name: Lang.getRef('chatCommands.test', Language.Default),
    //     name_localizations: Lang.getRefLocalizationMap('chatCommands.test'),
    //     description: Lang.getRef('commandDescs.test', Language.Default),
    //     description_localizations: Lang.getRefLocalizationMap('commandDescs.test'),
    //     dm_permission: true,
    //     default_member_permissions: undefined,
    // },
    JOIN: {
        type: ApplicationCommandType.ChatInput,
        name: "join",
        description: "hands out the role to join the game of dev",
        dm_permission: true,
        default_member_permissions: undefined,
    },
    CHECK: {
        type: ApplicationCommandType.ChatInput,
        name: "check",
        description: "checks if your hacker is safe in the current round",
        dm_permission: true,
        default_member_permissions: undefined,
        options: [
            {
                name: "mint",
                description: "the token mint for the hacker NFT",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
};

export const MessageCommandMetadata: {
    [command: string]: RESTPostAPIContextMenuApplicationCommandsJSONBody;
} = {
    // VIEW_DATE_SENT: {
    //     type: ApplicationCommandType.Message,
    //     name: Lang.getRef('messageCommands.viewDateSent', Language.Default),
    //     name_localizations: Lang.getRefLocalizationMap('messageCommands.viewDateSent'),
    //     default_member_permissions: undefined,
    //     dm_permission: true,
    // },
};

export const UserCommandMetadata: {
    [command: string]: RESTPostAPIContextMenuApplicationCommandsJSONBody;
} = {
    // VIEW_DATE_JOINED: {
    //     type: ApplicationCommandType.User,
    //     name: Lang.getRef('userCommands.viewDateJoined', Language.Default),
    //     name_localizations: Lang.getRefLocalizationMap('userCommands.viewDateJoined'),
    //     default_member_permissions: undefined,
    //     dm_permission: true,
    // },
};
