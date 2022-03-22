const Discord = require('discord.js')
const client = new Discord.Client()

// Defining my variables. I think this is important?
var CONFIG = require('./config.json');
var quote = CONFIG.quote;
var emoji = CONFIG.emoji;
var util = require('util');
var ee = require('events').EventEmitter;

client.on('ready', () => {
    console.log("Connected as " + client.user.tag),
    client.user.setActivity("@@help for help")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith(@@)) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the prefix
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the prefix is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "quote") {
	    var words = quote[Math.floor(Math.random() * quote.length)]
        receivedMessage.channel.send(""" + words + """)
    } else if (primaryCommand == "help") {
        receivedMessage.channel.send("Right now you can ask for a @@quote or ask me to @@emote.")
        } else if (primaryCommand == "emote") {
			    receivedMessage.channel.send(":" + emoji[Math.floor(Math.random() * emoji.length)] + ": " + " :" + emoji[Math.floor(Math.random() * emoji.length)] + ": " + " :" + emoji[Math.floor(Math.random() * emoji.length)] + ":")
		    } else {
		        receivedMessage.channel.send("I'm sorry, my friend--try `@@help` instead.")
    }
}

client.login(process.env.CLIENT_TOKEN)
