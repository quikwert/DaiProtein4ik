const fs = require("fs");
const { EmbedBuilder } = require('discord.js');

module.exports = (target) => {
    let data = fs.readFileSync("src/base.JSON", "utf8")
    data = JSON.parse(data)
    const user = data[target.id] != undefined ? data[target.id] : data[target]
    console.log("ok")
    console.log(user)



    return new EmbedBuilder()
        .setTitle('YOUR CV')
        .setColor(0X34ebe8)
        .addFields({ name: "Name", value: user.name })
        .addFields({ name: "Sex", value: user.sex, inline: true })
        .addFields({ name: "Age", value: `${user.age}`, inline: true })
        .addFields({ name: "Goal", value: user.goal, inline: true })
        .addFields({ name: "Gyms", value: user.gym, inline: true })
        .addFields({ name: "Details", value: user.info })
        .setImage(user.image)
        .setTimestamp()




}