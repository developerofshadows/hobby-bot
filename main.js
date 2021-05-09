const TelegramBot = require('node-telegram-bot-api');
const cfg = require('./impt data/config.json');
const admins = require('./impt data/admins.json');
const fs = require('fs');
const token = cfg.token;
const language = cfg.lang;
const localisation = require ('./localization/'+language+'loc');
const bot = new TelegramBot(token,{polling:true});
console.log(localisation.curloc);
parceids();
firstmessage = true;
var permmisions = ['superadmin','user','party finder']


function checklvl(id) //Check admin's lvl of user
 {
   for (i=0;i<admins.length-1;i++){
       if(id===Number(admins[i].id)){
           return admins[i].level;
       }
   }
   return 1;
 }
function todfunc(timestamp) {
      var hours = (new Date(timestamp*1000)).getHours();
      if(hours<6){
          return localisation.night;
      }
      if(5<hours&&hours<12){
          return localisation.morning;
      }
      if(11<hours&&hours<18){
          return localisation.day;
      }
      if(17<hours&&hours<23){
          return localisation.evening;
      }
}
function parceids() {
    const dir = './users settings'
    fs.readdir(dir,(err,files) => {
        console.log(files.length + 'parced');
        var usedids = Array(files.length);
        for(a=0;a<files.length;a++){
            console.log(files);
        }
    }); 
}

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
    bot.sendMessage(chatId, resp);
  });
  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const seclvl = checklvl(msg.from.id);
    const tod = todfunc(msg.date); //Times of Day

    if(firstmessage){
    switch (seclvl) {
        case 0:
        case 2:
            bot.sendMessage(chatId, tod+localisation.admhellomsg+permmisions[seclvl]) //Admin hello message
            break;
        case 1:
            bot.sendMessage(chatId, tod+localisation.usrhellomsg) //User hello message
            break;
    }
   }

  });