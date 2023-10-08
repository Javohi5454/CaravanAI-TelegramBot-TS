// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Context, Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";

export class StartCommand extends Command {
  aboutBot: string[] = [];
  chooseTour: string[] = [];
  messageText: string = "";
  chatId: number | undefined;
  messageTextBudget: number | undefined ;
  webAppUrl: string = 'https://verdant-zabaione-953597.netlify.app/'

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  
  // обработчик
  handle(): void {
    this.bot.start(async (ctx) => {
      console.log(ctx.from.first_name);
      console.log(ctx.from.username);
      
      this.aboutBot = [
        `Здрствуйте ${ctx.from.first_name},
            
Вас приветствует ТурАгенство Caravan Tourizm, 

Я являюсь вашим ТурСопровадителем основаном на Исскуственном Интелекте первом в Узбекистане`,
      ];
      ctx.reply(`${this.aboutBot}`, {
          reply_markup: {
            inline_keyboard: [
                /* One button */
                [ { text: "Посмотреть все туры ☀️ 🏖", web_app: {url: this.webAppUrl} }], [{ text: "Посмотреть горячие туры 🔥", web_app: {url: this.webAppUrl} } ],
                
                /* Also, we can have URL buttons. */
                [ { text: "Сделат себе тур с помощью ИИ 🤖", callback_data: 'makeForAi' } ]
            ],
          }, 
      });
      const mainMenuKeyboard = Markup.keyboard([
        Markup.button.callback('Найти нас 🔍🗺', 'addAction'),Markup.button.callback('Связатся с нами ☎️', 'addAction'),
        Markup.button.callback('Сделат себе тур с помощью ИИ 🤖', 'addAction')
        ],{columns: 2}).resize();
        ctx.reply("Если вы хотите получить личную консультацию, то нажмите на кнопку ниже Найти нас 🔍🗺 то приходите в наш филиал, будем рады вас там видеть 🏪", mainMenuKeyboard)
    });
    this.bot.hears('Найти нас 🔍🗺', async (ctx: Context) => {
      try {
        // Отправка локации в ответ на команду /location
        await ctx.reply('С радостью ждем вас в нашем филиале😇') // Замените координаты на нужные вам
        await ctx.replyWithLocation(41.3156257273364, 69.32864228814121);
      } catch (error) {
        console.error('Ошибка при отправке локации:', error);
        ctx.reply('Произошла ошибка при отправке локации.');
      }
    });
    this.bot.hears('Связатся с нами ☎️', (ctx) => {
      // const contactNumber = '+998970396454'
      ctx.sendMessage('с нетерпением ждем вас звонок😊📞')
      ctx.replyWithContact('+998998970396454', 'Связатся с нами ☎️')
    })
    this.bot.action("makeForAi", async (ctx) => {
      ctx.sendMessage("Запишите куда вы хотите вы отправится?")
      
    })
    // this.bot.hears('', (ctx) => {
    //   const reqNumber = Markup.inlineKeyboard([
    //     Markup.button.contactRequest()
    //   ])
    //   ctx.reply()
    // })
    this.bot.hears("Сделат себе тур с помощью ИИ 🤖", async (ctx) => {
      ctx.sendMessage("Запишите куда вы хотите вы отправится?")
      
    })
    // senddata (send messages to group)
    this.bot.command('senddata', async (ctx) => {
      try {
        // Отправка сообщения в группу
        const groupId = '-4074004517';
        const message = 'Ваши данные✅';
        console.log('Data to send succes✅')
        await ctx.telegram.sendMessage(groupId, message);
        ctx.reply('Данные успешно отправлены в группу✅!');
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        ctx.reply('Произошла ошибка при отправке данных.');
      }
    });
    // location

    // async function queryBudget() {

    // }
    this.bot.on('message', async (ctx) => {
      const message = ctx.message;
      if (message && 'text' in message) {
        const messageText = message.text;
        console.log('Текст сообщения:', messageText);
        if (!this.messageText) {
          this.messageText = messageText;
          ctx.sendMessage("Какой у вас бюджет в $?")
        } else if (!this.messageTextBudget) {
          const messageBudget = Number.parseInt(messageText);
          if (messageBudget) {
            console.log('Текст budget:', messageBudget);
            this.messageTextBudget = messageBudget;
            if (messageBudget < 400) {
              console.log("Not enough");
              await ctx.sendMessage('Этого капитала не достаточно для путешествия 😢');
              await ctx.sendMessage('Просим вас поднять планку в бюджету для вашего будещего путиществия')
            } else {
              ctx.sendMessage('Прекрасно 😁');
              
              console.log("Good");
              // Ваши дальнейшие действия с переменными messageText и messageTextBudget
            }
          }
        }
      } else {
        console.log("Not found text");
      }


    });

    
  }
}


