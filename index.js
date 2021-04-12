var _ = require('lodash');

const Discord = require('discord.js');
const discordClient = new Discord.Client();

discordClient.on('ready', () => {
  discordClient.user.setActivity('something something', {type: 'SAILING'});
});

discordClient.on('message', msg => {
  // skip if it was me
  console.log(msg.author.bot);
  if (msg.author.bot) return;

  
  var eachParagraph = _.split(msg.content, '\n\n');
  var embed = new Discord.MessageEmbed();

  embed.setAuthor(msg.author.username, msg.author.avatarURL());
  embed.setTitle(msg.channel.parent.name);
  embed.setDescription('Some description here');
  embed.attachFiles([msg.author.avatarURL()]);

  _.each(eachParagraph, function(p){
    p = _.trim(p);
    
    if (_.startsWith(p, '::')) {
      embed.addField('Action', p.substr(2).slice(0,-2));
    } else if (_.startsWith(p, '"')) {
      embed.addField('Quote', p);
    } else if (_.startsWith(p, '**')) {
      embed.addField('Rolls', p.substr(2));
    } else { 
      embed.addField('.', p);
      //
      //
    }
  
  embed.setFooter("\u3000".repeat(10/100)+"|")
  });
  
  msg.channel.send(embed);
  
  //var linkRegexp = /\[.+\]\(.+\)/gm;
  //var actionsRegexp = /::.*::/gm;
  //var quotesRegexp = /".*"/gm;

  //var links = msg.content.match(linkRegexp);
  //var actions = msg.content.match(actionsRegexp);
  //var quotes = msg.content.match(quotesRegexp);

  //links = links || [];
  //actions = actions || [];
  //quotes = quotes || [];
  
  //if (links.length > 0 || actions.length > 0 || quotes.length > 0) {
    //var embedOptions = {
      //color: '#0099ff',
      //image: {
        //url: msg.author.avatarURL(),
      //},
      //title: msg.author.username,
      //fields: []
    //};

    //if (links.length > 0) {
      //embedOptions.fields.push({
        //name: "Rolls",
        //value: links.join('\n')
      //});
    //}

    //if (actions.length > 0) {
      //for (var i = 0; i < actions.length; i++) {
        //embedOptions.fields.push({
          //name: "Action",
          //value: actions[i].slice(0, 1023) // there is a limit on length
        //});
      //}
    //}

    //if (quotes.length > 0) {
      //embedOptions['description'] = quotes.join('\n');
    //}

    //discordClient.channels.cache.get('CHANNEL ID').send(...) Not Active previously
    //msg.guild.channels.cache.find(i => i.name === 'CHANNEL NAME').send(...) Not Active previously
    
    //msg.channel.send({
      //embed: embedOptions
   //});
  //}
});

// this will pull from .env file locally, or ENV from heroku
discordClient.login(process.env.TOKEN);
