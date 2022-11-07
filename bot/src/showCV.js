const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = async (interaction, targetId) => {

    const cv = require("./generateEmbedded")(targetId)

    const message = await interaction.deferReply({
        fetchReply: true,
        ephemeral: true
    });
    cv.setTitle(targetId);

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('like')
                .setLabel('❤️')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('dislike')
                .setLabel('💩')
                .setStyle(ButtonStyle.Secondary),
        );

    await interaction.editReply({ content: "", ephemeral: true, embeds: [cv], components: [row] });
}