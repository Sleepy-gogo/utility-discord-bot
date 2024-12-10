import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { formatText, getChannelName, tipos } from '../../utils.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rename')
    .setDescription('Renames the current channel to the given text.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The text you want to rename the channel to.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('emoji')
        .setDescription('The emoji you want to use for the channel name.')
        .setRequired(true)
    ),
  type: tipos.GLOBAL,
  execute: async function (interaction) {
    await interaction.reply({
      content: 'Renaming...',
      ephemeral: true
    });

    const name = interaction.options.getString('name');
    const formattedName = formatText(name);
    const emoji = interaction.options.getString('emoji');

    const channelName = getChannelName(formattedName, emoji);

    try {
      await interaction.channel.setName(channelName);
      await interaction.editReply({
        content: `Renamed channel to **${emoji} ${name}**!`
      });
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content:
          'Failed to rename channel. Please check the bot permissions and try again later.'
      });
    }
  }
};
