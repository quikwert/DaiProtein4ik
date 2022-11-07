const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription("Returns ping"),

    async execute(interaction, client) {

        let base = fs.readFileSync("src/base.json");
        base = JSON.parse(base);
        let recs = fs.readFileSync("src/recs.json");
        recs = JSON.parse(recs);

        let arr = [];
        for (user in base) {
            if (!recs[interaction.member.user.id].rated.includes(user) && user != interaction.member.user.id) {
                arr.push(user);
            }

        }

        recs[interaction.member.user.id].queue = arr;
        fs.writeFileSync("src/recs.json", JSON.stringify(recs));
        if (!(arr.length > 0)) {
            interaction.reply({ embeds: [new EmbedBuilder().setTitle("Noone new to check out").setColor(0Xff0000)], ephemeral: true })
            return;
        }
        console.log(arr)
        require("./../../showCV")(interaction, recs[interaction.member.user.id].queue[0]);
    }
}