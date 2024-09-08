import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.commandsArray = [];

//Get function folders path and all it's sub folders
const funcsFoldersPath = path.join(__dirname, 'functions');
const funcsFolders = fs.readdirSync(funcsFoldersPath);

// For every folder, gets all it's .js files
for (const folder of funcsFolders) {
  const funcsPath = path.join(funcsFoldersPath, folder);
  const functionFiles = fs
    .readdirSync(funcsPath)
    .filter((file) => file.endsWith('.js'));

  // For every .js file, gets it's function
  for (const file of functionFiles) {
    const filePath = path.join(funcsPath, file);
    const func = (await import(filePath)).default;
    // Set the function into the client
    try {
      func(client);
    } catch (error) {
      console.log(error);
      console.error(
        `[WARNING] There was an error setting up ${file}. Please verify before running again.`
      );
    }
  }
}

await client.loadCommands();
await client.deployCommands();
await client.handleEvents();

client.login(TOKEN);
