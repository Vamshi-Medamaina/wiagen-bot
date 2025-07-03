const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;



const { exceler } = require('../menu/menuReader');
const { formatMenu,singleMeal } = require('../menu/menuFormater');


const bot = new TelegramBot(token, { polling: true, request: {
    agentOptions: {
        keepAlive: true,
        family: 4
    }
}});
bot.on("polling_error",(err)=>{
    console.error("Polling error: ",err);
})

console.log("Bot is up and running!");



const dayMap = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};


let cachedMenu = null;



bot.on('message',async (msg)=>{
    const chatId = msg.chat.id;
    const message=msg.text;

    if(message==="/start" || message === "/help"){
        bot.sendMessage(chatId,`Welcome to MenuBot🍽️!
            
Use these commands:
/today - Full Menu for today
/tomorrow - Full Menu for tomorrow
/breakfast - Today's breakfast
/lunch - Today's lunch
/snacks - Today's snacks
/dinner - Today's dinner
/refresh - Reload the menu`);

        return;
    }

    try{

        if(!cachedMenu){
            cachedMenu= await exceler();
        }
        const menu = cachedMenu;
        const d= new Date().getDay();

        if(message==='/refresh'){
            cachedMenu=await exceler();
            bot.sendMessage(chatId,"✅ Menu has been reloaded.")
        }
        

        if(message=='/today'){
            const day=dayMap[d];
        let todayFood=menu[day]
        //console.log(menu[day].breakfast);
        bot.sendMessage(chatId,formatMenu(day,todayFood));
        }

        if(message=='/breakfast'){
            const day = dayMap[d];
            let breakFast=menu[day].breakfast;
            bot.sendMessage(chatId,singleMeal(day,"breakfast",breakFast));
        }

        if(message=='/lunch'){
            const day = dayMap[d];
            let lunch=menu[day].lunch;
            bot.sendMessage(chatId,singleMeal(day,"lunch",lunch));
        }
        if(message=='/snacks'){
            const day = dayMap[d];
            let snacks=menu[day].snacks;
            bot.sendMessage(chatId,singleMeal(day,"snacks",snacks));
        }
        if(message=='/dinner'){
            const day = dayMap[d];
            let dinner=menu[day].dinner;
            bot.sendMessage(chatId,singleMeal(day,"dinner",dinner));
        }

        if(message=='/tomorrow'){
            const day=dayMap[d<6 ? d+1 : 0];
            let tomorrowFood=menu[day];
            bot.sendMessage(chatId,formatMenu(day,tomorrowFood));
        }

    }catch(e){
        console.log("The error is ",e);
        bot.sendMessage(chatId,"Something went wrong. Try refreshing...")
    }
});