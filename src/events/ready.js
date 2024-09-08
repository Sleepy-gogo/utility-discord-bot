import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.username} succesfully logged.`);
    setInterval(client.pickPresence, 20 * 1000);
    console.log('Activities setted up correctly.');
  }
};
