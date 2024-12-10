import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionFlagsBits
} from 'discord.js';
import { tipos } from '../../utils.js';

export default {
  data: new ContextMenuCommandBuilder()
    .setName('Mandar a Fanart')
    .setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  type: tipos.GUILD,
  guild_ids: ['1231822315017474138'],
  execute: async function (interaction) {
    const images = [];
    interaction.targetMessage.attachments.forEach((attachment) => {
      images.push(attachment.url);
    });
    const id = interaction.targetMessage.author.id;

    const url =
      'https://discord.com/api/webhooks/1238401705616605224/Zolh1YvljPLgGlvPuJHtwXSu1AKh_HfoM6A-EAhgpPDkzzUZATXYkcgK1MB7ZHJBitlF';
    const message = {
      content: `¡Muchísimas gracias <@${id}> por tomarte el tiempo de hacer algo para nosotros!`,
      embeds: [
        {
          title:
            '¡Nos llegó un Fanart! ¡Miren todos! ¡Aprecien esta obra de arte!',
          color: 9326591,
          image: {
            url: images[0]
          }
        }
      ]
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    await interaction.reply({
      content: `Imagen añadida al canal de fanarts!`,
      ephemeral: true
    });
  }
};
