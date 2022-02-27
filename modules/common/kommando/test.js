const kommando = require('discord-kommando.js');
const Discord = require('discord.js');

// Setup new Command
const command = new kommando.Command({
    name: "test",
    description: "A Sample Command",
    aliases: []
});

// Handle Created Command
command.handle((message, args) => {
    message.channel.send("Hello World!");
});

// Export Command
module.exports = command;