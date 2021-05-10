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
var permmisions = ['superadmin','user','party finder'];
var usedids = new Array;
let firstdata = 
{
  'userlang':'',
  'dpn':'' //default party
}
let data = JSON.stringify(firstdata);

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
        console.log(files.length + ' user files parced');
        for(a=0;a<files.length;a++){
            usedids[a]=files[a];
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
    for(z=0;z<usedids.length;z++){
        if(usedids[z].slice(0,-5)==msg.from.id){    
                  firstmessage = false;
                  break;
        }
        if(usedids.length-1===z){
                fs.writeFileSync('./user settings/'+msg.from.id+'.json',data);
                bot.sendMessage(chatId,localisation.langquestion);
        }
    }

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
   switch (msg.text) {
       case '':
   }

  });