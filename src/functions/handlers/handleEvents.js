import fs from 'fs';

export default (client) => {
  client.handleEvents = async () => {
    const eventsPath = `./src/events`;
    const eventsFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith('.js'));

    // For every .js file, get's it's content and checks if the event is valid
    for (const file of eventsFiles) {
      const event = (await import(`../../events/${file}`)).default;
      // Sets the event handler depending on if it should happen once or many times
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  };
};
