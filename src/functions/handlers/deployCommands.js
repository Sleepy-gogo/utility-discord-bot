import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

export default (client) => {
  client.deployCommands = async () => {
    const rest = new REST({
      version: '10'
    }).setToken(TOKEN);

    const { commandsArray } = client;

    (async () => {
      try {
        console.log(
          `Started refreshing ${commandsArray.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commandsArray
        });

        console.log(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
      } catch (error) {
        // Logging errors to the console
        console.error(error);
      }
    })();
  };
};
