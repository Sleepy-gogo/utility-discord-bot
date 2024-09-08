import { SlashCommandBuilder, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('separator')
    .setDescription('Creates a voicechat channel formatted as a separator')
    .setDMPermission(false),
  execute: async function (interaction) {
    await interaction.reply({
      content: 'Generating...',
      ephemeral: true
    });

    try {
      if (!interaction.channel.parent) {
        await interaction.guild.channels.create({
          name: '᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆',
          type: ChannelType.GuildVoice
        });
      } else {
        await interaction.channel.parent.children.create({
          name: '᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆᠆',
          type: ChannelType.GuildVoice
        });
      }

      await interaction.editReply({
        content: 'The separator has been successfully created!',
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
