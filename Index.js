const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready! 🎉');
});

client.on('message', async msg => {
    const text = msg.body.toLowerCase() || '';
    const chat = await msg.getChat();

    if (chat.isGroup) {
        if (text === '!ping') {
            msg.reply('🏓 Pong! Bot is alive!');
        }
        else if (text === '!waifu') {
            const waifus = ['Zero Two', 'Marin Kitagawa', 'Mai Sakurajima', 'Rem', 'Asuna'];
            const randomWaifu = waifus[Math.floor(Math.random() * waifus.length)];
            msg.reply(`Your waifu of the day is: *${randomWaifu}* 🌸`);
        }
        else if (text === '!quote') {
            const quotes = [
                "Believe in the me that believes in you! - Kamina",
                "People's dreams... have no ends! - Blackbeard",
                "If you don't like your destiny, don't accept it. - Naruto Uzumaki"
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            msg.reply(`*Anime Quote:*\n${randomQuote}`);
        }
        else if (text === '!help') {
            const helpText = `
*Anime GC Bot Commands:*
!ping - Check if the bot is online
!waifu - Get a random waifu suggestion
!quote - Get a random inspirational anime quote
!help - Show this help message
            `;
            msg.reply(helpText);
        }
    }
});

client.initialize();
