const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const ge = require("../../generateEmbedded")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription("Returns your CV"),
    async execute(interaction, client) {
        // const embed = await ge(interaction.member);
        // await client.channels.cache.get(interaction.channelId).send({embeds:[embed]});           
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

       
        
        await interaction.editReply({ content: "", ephemeral: true, embeds: [ge(interaction.member).setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.user.avatarURL({ dynamic:true }) }) ] });
    }
} 