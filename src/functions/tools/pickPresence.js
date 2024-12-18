const {ActivityType} = require('discord.js');

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "my code being written!",
        status: "idle"
      },
      {
        type: ActivityType.Listening,
        text: "events being handled!",
        status: "idle"
      },
      {
        type: ActivityType.Playing,
        text: "with my interactions!",
        status: "idle"
      }
    ];

    const option = Math.floor(Math.random() * options.length);

    client.user
      .setPresence({
        activities: [{
          name: options[option].text,
          type: options[option].type
        }],
        status: options[option].status
      });
  };
};