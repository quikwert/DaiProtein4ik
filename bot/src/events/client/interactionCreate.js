const fs = require("fs")
const { ChannelType } = require("discord.js")




module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return

            try {
                await command.execute(interaction, client);
            }
            catch (error) {
                console.log(error);
                await interaction.reply({
                    content: "Something went wrong...",
                    ephemeral: true
                })
            }
        }

        if (interaction.isButton()) {

            let message
            let recs = fs.readFileSync("src/recs.json")
            let base = fs.readFileSync("src/base.json")
            recs = JSON.parse(recs)
            base = JSON.parse(base)
            if (interaction.customId == "like") {
                message = "Liked❤️"
                recs[interaction.member.user.id].rated.push(interaction.message.embeds[0].title);
                if (recs[interaction.member.user.id].likedBy.includes(interaction.message.embeds[0].title)) {
                    interaction.message.guild.channels.create({
                        name: `${base[interaction.member.user.id].name} and ${base[interaction.message.embeds[0].title].name}`,
                        type: ChannelType.GuildText,
                    //     permissionOverwrites: [{
                    //         id: interaction.member.user.id,
                    //         allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY","VIEW_CHANNEL"]
                    //     },
                    //     {
                    //         id: interaction.message.embeds[0].title,
                    //         allow: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY","VIEW_CHANNEL"]
                    //     }
                    // ]
                    });
                }
                else{
                    recs[interaction.message.embeds[0].title].likedBy.push(interaction.member.user.id);
                }
                
                fs.writeFileSync("src/recs.json",JSON.stringify(recs));

            }

            else if (interaction.customId == "dislike") {
                message = "Disliked💩"
                recs[interaction.member.user.id].rated.push(interaction.message.embeds[0].title);
                fs.writeFileSync("src/recs.json",JSON.stringify(recs));
            }

            await interaction.update({ components: [], embeds: [], content: message });

            require("../../next")(interaction, interaction.member.user.id, interaction.message.embeds[0].title);
        }

    },
};