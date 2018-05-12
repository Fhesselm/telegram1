
const { TelegramClient } = require('messaging-api-telegram');
    
// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const client = TelegramClient.connect('594354790:AAFLIOAQp-miZlovMXadaK6lZtzsnurl57E');

module.exports = {
    
    sendMessage(message) {
        //console.log("Ich bin im TelegramClient und versende: " +message);
        client.sendMessage("-299666871", message, {
            disable_web_page_preview: true,
            disable_notification: true,
        });
    }
};