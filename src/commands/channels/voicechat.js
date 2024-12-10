import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} from 'discord.js';
import { getVoiceChannelName, tipos } from '../../utils';

export default {
  data: new SlashCommandBuilder()
    .setName('voice')
    .setDescription(
      'Creates a voice channel with the name provided already formated and ready.'
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The name of the channel you want to create.')
        .setRequired(true)
        .setMinLength(1)
        .setMaxLength(25)
    )
    .addStringOption((option) =>
      option
        .setName('emoji')
        .setDescription('The emoji of the channel you want to create.')
        .setRequired(true)
    ),
  type: tipos.GLOBAL,
  execute: async function (interaction) {
    await interaction.reply({
      content: 'Generating...',
      ephemeral: true
    });

    try {
      const name = interaction.options.getString('name');
      const emoji = interaction.options.getString('emoji');
      const voicechatName = getVoiceChannelName(name, emoji);

      if (!interaction.channel.parent) {
        await interaction.guild.channels.create({
          name: voicechatName,
          type: ChannelType.GuildVoice
        });
      } else {
        await interaction.channel.parent.children.create({
          name: voicechatName,
          type: ChannelType.GuildVoice
        });
      }
      await interaction.editReply({
        content: `**${emoji} ${name}** has been successfully created!`,
        ephemeral: true
      });
    } catch (error) {
      console.log(error);

      await interaction.editReply({
        content:
          'Your channel could not be created! Please check if the bot has the necessary permissions!',
        ephemeral: true
      });
    }
  }
};
