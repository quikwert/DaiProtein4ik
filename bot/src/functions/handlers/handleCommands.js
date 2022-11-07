const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");


module.exports = (client) => {
    client.handleCommands = async () => {        
        const commandFolders = fs.readdirSync('src/commands');
        const { commands, commandArray } = client;
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())                
            }
        }
        const clientId = '1037281357161832498';
        const guildId = '1037279675728269343';
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        try {
            console.log("started refreshing application");

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: commandArray,
            });

            console.log("succesfully uploaded app commands")
        }
        catch (error) {
            console.error(error)
        }

    };
};