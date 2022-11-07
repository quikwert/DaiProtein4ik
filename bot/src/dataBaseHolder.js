const fs = require("fs");

module.exports = {
    async write(args, interaction) {

        const form = {
            name: args[0],
            sex: args[1],
            age: args[2],
            goal: args[3],
            gym: args[4],
            info: args[5],
            image: args[6],
        }

        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });
        try {
            fs.readFile("src/base.JSON", "utf8", (err, data) => {

                data = JSON.parse(data.toString() + "\n");

                let user = interaction.user.id;                
                
                if (data[user] && form.image == "") form.image = data[user]["image"]
                if (form.image == "") form.image = "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png";
                

                data[user] = form;
                fs.writeFile("src/base.json", JSON.stringify(data), async () => {

                    await interaction.editReply({
                        content: "CV Saved!",
                        
                    });
                })
            });

        }
        catch (error) {
            const message = await interaction.deferReply({
                fetchReply: true
            });
            await interaction.editReply({
                content: "Something went wrong!",
                ephemeral: true
            });
        }
    },
    async read(args) {
        
    }
}
