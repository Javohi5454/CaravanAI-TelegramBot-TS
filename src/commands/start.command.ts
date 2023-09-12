import { Context, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  aboutBot: string[] = [];
  chooseTour: string[] = [];
  messageText: string = "";
  chatId: number | undefined;
  // text: string | undefined;
  
  webAppUrl: string = 'https://ya.ru'
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  // chatId: number;
  
  // обработчик
  handle(): void {
    this.bot.start((ctx) => {
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
          }   
      });
      console.log(ctx.reply);
    });
    this.bot.action("makeForAi", (ctx) => {
      ctx.sendMessage("Запишите куда вы хотите вы отправится?")
    })
    this.bot.on('message', async (ctx: Context) => {
      
      // const messageText =  await ctx.message?.text;
      // console.log('Текст сообщения:', messageText);
      
      const message = ctx.message;
      if (message && 'text' in message) {
        const messageText = message.text;
        console.log('Текст сообщения:', messageText);
      }else {
        console.log("Not found text");
        
      }
    });
  }
}

