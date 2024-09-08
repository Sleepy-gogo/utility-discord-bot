import fs from 'fs';
import path from 'path';

export default (client) => {
  client.loadCommands = async () => {
    //Get folders path and all it's sub folders
    const commFoldersPath = `./src/commands`;
    const commandFolders = fs.readdirSync(commFoldersPath);

    // For every folder, get's all it's .js files
    for (const folder of commandFolders) {
      const commandsPath = path.join(commFoldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'));

      const { commands, commandsArray } = client;

      // For every .js file, get's it's content and checks if the command is valid
      for (const file of commandFiles) {
        const command = (await import(`../../commands/${folder}/${file}`))
          .default;
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
          commands.set(command.data.name, command);
          commandsArray.push(command.data.toJSON());
        } else {
          //Sets warning message if any command is missing requirements
          console.log(
            `[WARNING] The command at commands/${folder}/${file} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  };
};
