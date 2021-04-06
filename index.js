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


  var linkRegexp = /\[.+\]\(.+\)/gm;
  var actionsRegexp = /::.*::/gm;
  var quotesRegexp = /".*"/gm;

  var links = msg.content.match(linkRegexp);
  var actions = msg.content.match(actionsRegexp);
  var quotes = msg.content.match(quotesRegexp);

  if (links.length > 0 || actions.length > 0 || quotes.length > 0) {
    var embedOptions = {
      color: '#0099ff',
      image: {
        url: msg.author.avatarURL(),
      },
      title: msg.author.username,
      fields: []
    };

    if (links.length > 0) {
      embedOptions.fields.push({
        name: "Rolls",
        value: links.join('\n')
      });
    }

    if (actions.length > 0) {
      for (var i = 0; i < actions.length; i++) {
        embedOptions.fields.push({
          name: "Action",
          value: actions[i].slice(0, 1023) // there is a limit on length
        });
      }
    }

    if (quotes.length > 0) {
      embedOptions['description'] = quotes.join('\n');
    }

    msg.channel.send({
      embed: embedOptions
    });
  }
});

// this will pull from .env file locally, or ENV from heroku
discordClient.login(process.env.TOKEN);