import { SlashCommandBuilder } from 'discord.js';
import { formatText } from '../../utils.js';

export default {
  data: new SlashCommandBuilder()
    .setName('format')
    .setDescription('Returns a formatted text!')
    .addStringOption((option) =>
      option
        .setName('text')
        .setDescription('The text you want to format.')
        .setRequired(true)
    ),
  execute: async function (interaction) {
    await interaction.reply(formatText(interaction.options.getString('text')));
  }
};
