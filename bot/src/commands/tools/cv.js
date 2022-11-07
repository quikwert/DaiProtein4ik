const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cv')
        .setDescription('cv')
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Your name")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sex")
                .setDescription("Your gender")
                .setRequired(true)
                .addChoices(
                    { name: 'Male', value: "Male" },
                    { name: 'Female', value: "Female" }
                )
        )
        .addIntegerOption(option =>
            option.setName("age")
                .setDescription("Age")
                .setMaxValue(100)
                .setMinValue(14)
                .setRequired(true)

        )
        .addStringOption(option =>
            option.setName("goal")
                .setDescription("Your workout routine goal")
                .setRequired(true)
                .addChoices(
                    { name: 'Bulk', value: "on Bulk" },
                    { name: 'Cut', value: "on Cut" },
                    { name: 'Agility', value: "Training for Agility" },
                    { name: 'Strength', value: "Training for Strength" }
                )
        )
        .addStringOption(option =>
            option.setName("gym")
                .setDescription("Specified gym subscriptions")
                .setMaxLength(1000)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("info")
                .setDescription("Contact, details about yourself")
                .setMaxLength(1000)
                .setRequired(false)
        ).addAttachmentOption(option =>
            option.setName("image")
                .setDescription("Profile Picture")
                .setRequired(false)),

    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const sex = interaction.options.getString('sex');
        const age = interaction.options.getInteger('age');
        const goal = interaction.options.getString('goal');
        const gym = interaction.options.getString('gym');
        const details = interaction.options.getString('info') || "No Details Provided";
        let image;
        image = "";
        if(interaction.options.data.find(el => el.name == "image") != undefined){
            image = interaction.options.data.find(el => el.name == "image").attachment.proxyURL 
            
        }
         console.log("CV ADDED");
        let recs = fs.readFileSync("src/recs.json");
        recs = JSON.parse(recs);
        if(!recs[interaction.member.user.id]){
            recs[interaction.member.user.id] = {"likedBy":[],"rated":[],"iterator":0,"queue":[]}
            fs.writeFileSync("src/recs.json", JSON.stringify(recs));
        }
        

        require("../../dataBaseHolder.js").write([name, sex, age, goal, gym, details, image], interaction);
    },
};