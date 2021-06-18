const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    	const channel = message.guild.channels.cache.find(ch => ch.name === "suggesties");
        if (!channel) return message.replay("Kanaal niet gevonden");

        var argsBericht = args.join(" ");
        if (!argsBericht) return message.reply("Ik kan natuurlijk niks met geen suggestie");

        var embed = new discord.MessageEmbed()
        .setDescription(argsBericht)
        .setColor("ed670e")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

        channel.send(embed).then(async (msg) => {
            await msg.react("✔");
            await msg.react("❌");
            message.delete();
        }).catch(err => {
            console.logg(err);
        })
}

module.exports.help = {
  name: "suggestie"
}