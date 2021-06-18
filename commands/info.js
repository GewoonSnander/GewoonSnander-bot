const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

var botEmbed = new discord.MessageEmbed()

            .setTitle('Bot informatie')
            .setDescription("Hieronder vind je wat informatie over de bot!")
            .setColor("#00FF001")
            .addField("Bot naam", bot.user.username)
 
            .setThumbnail('')
            .setImage('https://bit.ly/3ghxfvJ')
            .setTimestamp()
            .setFooter("Gestuurt", 'https://bit.ly/3ghxfvJ');
 
        return message.channel.send(botEmbed);

}

module.exports.help = {
  name: "info"
}