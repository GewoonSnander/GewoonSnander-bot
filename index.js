const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const bot = new discord.Client();

bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);
        bot.commands.set(fileGet.help.name, fileGet);
        
    })
});



bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.cache.get('854740925347790858');
    if (!role) return;
    member.role.add(role);

    var channel = member.guild.channels.cache.get('854741266137743360');
    if (!channel) return;

    channel.send(`${member} welkom op de server! 🎉`);


})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("GewoonSnander", { type: "LOOKS"});

});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var prefix = botConfig.prefix;
    var messageArray= message.content.split(" ");
    var commands = messageArray[0];
    var argumenst = messageArray.slice(1);
    var commands = bot.commands.get(commands.slice(prefix.length));
    if (commands) commands.run(bot, message, argumenst);
})

bot.login(procces.env.token);