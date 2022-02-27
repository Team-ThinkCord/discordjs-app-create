require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord().Client();

const kommando = require('discord-kommando.js');
const Disbut = require('discord-buttons');
const Dokdo = require('dokdo');
const prefix = '!;'

const options = []; // Kommando Options 

// Setup Kommando 
kommando.setupKommando('src/commands', prefix, [options]);

// Setup Dokdo 
const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok'], prefix: prefix });

// Setup Disbut 
disbut(client);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
	// Handle Kommando 
	kommando.CommandHandler(message);

	// Handle Dokdo 
	DokdoHandler.handle(message);
});

client.login(process.env.TOKEN);