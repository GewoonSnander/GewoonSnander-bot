const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Id van category van tickets.
    const categoryId = "854744228378705921";
 
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {
 
        message.channel.delete();
 
    } else {
 
        message.channel.send("Dit commando werkt alleen in een ticket.");
 
    }
 
    var embedCloseTicket = new discord.MessageEmbed()
    .setTitle("Ticket, " + message.channel.name)
    .setDescription("De ticket is gemarkeerd als **compleet**.")
    .setFooter("Ticket gesloten");

 
    // Vind kanaal voor de logs.
    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
    if (!ticketChannel) return message.reply("Kanaal niet gevonden");
 
    ticketChannel.send(embedCloseTicket);
 
}
 
module.exports.help = {
    name: "close",
    description: "Sluit een ticket af"
}