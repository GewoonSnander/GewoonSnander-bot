const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // ID van de categorie van de tickets.
    const categoryId = "854744228378705921";
 
    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;
 
    // Als ticket al gemaakt is
    var bool = false;
 
    // Kijk na als ticket al gemaakt is.
    message.guild.channels.cache.forEach((channel) => {
 
        // Als ticket is gemaakt, zend bericht.
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
 
            message.channel.send("Je hebt al een ticket open staan.");
 
            bool = true;
 
        }
 
    });
 
    // Als ticket return code.
    if (bool == true) return;
 
    var embedCreateTicket = new discord.MessageEmbed()
        .setTitle("Hoi, " + message.author.username)
        .setFooter("Support kanaal wordt aangemaakt")
        .setColor("#ffff00");
 
    message.channel.send(embedCreateTicket);
 
    // Maak kanaal en zet in juiste categorie.
    message.guild.channels.create(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal
 
        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
 
            // Zet perms voor iedereen
            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false

            });
            // Zet perms voor de gebruiker die ticket heeft aangemaakt.
            settedParent.updateOverwrite(message.author.id, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
 
            });
 
            var embedParent = new discord.MessageEmbed()
            .setTitle(`Hallo ${message.author.username}`)
            .setDescription("Laat hier jouw vraag achter")
            .setColor("#ffff00");
 
            settedParent.send(embedParent);
          }
        
        ).catch(err => { if(err) throw err
            message.channel.send("Er is iets fout gegaan, probeer het over een paar seconden op nieuw.");
        });
      }
    
    
    ).catch(err => { if(err) throw err
        message.channel.send("Er is iets fout gegaan probeer het over een paar seconden op nieuw.");
    });
 
}
 
module.exports.help = {
    name: "ticket",
    description: "Maak een ticket aan"
}