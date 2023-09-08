// import { Markup, Telegraf } from "telegraf";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  aboutBot: string[] = [];
  chooseTour: string[] = [];
  
  chatId: number | undefined;
  // text: string | undefined;
  
  webAppUrl: string = 'https://ya.ru'
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  // chatId: number;
  
  // обработчик
  handle(): void {
    // this.bot.start((ctx) => {
    //     console.log(ctx);
    //     ctx.reply(
    //             "Куда вы хотите отправится?", Markup.inlineKeyboard([
    //             Markup.button.callback("Turkey", "course_turkey"),
    //             Markup.button.callback("Egypt", "course_egypt"),
    //         ])
    //     )
    // })
    
    // this.bot.on('message', (ctx) => {
    //   this.chatId = ctx.chat.id;
    //   console.log(ctx.update.message);
      
      
    // })
    
    this.bot.start((ctx) => {
      console.log(ctx.from.first_name);
      console.log(ctx.from.username);
      this.aboutBot = [
        `Здрствуйте ${ctx.from.first_name},
            
Вас приветствует ТурАгенство Caravan Tourizm, 

Я являюсь вашим ТурСопровадителем основаном на Исскуственном Интелекте первом в Узбекистане`,
      ];
      // ctx.reply(
      //   `${this.aboutBot}`,
      //     Markup.inlineKeyboard([
      //     Markup.button.callback("Подбери мне горящий тур", web_app: {url: this.webAppUrl}),
      //   ]),
      // );
      ctx.reply(`${this.aboutBot}`, {
        reply_markup: {
            inline_keyboard: [
                /* One button */
                [ { text: "Посмотреть все туры ☀️ 🏖", web_app: {url: this.webAppUrl} }], [{ text: "Посмотреть горячие туры 🔥", web_app: {url: this.webAppUrl} } ],
                
                /* Also, we can have URL buttons. */
                [ { text: "Сделат себе тур с помощью ИИ 🤖", url: "telegraf.js.org" } ]
            ]
        }

                    
    });
      console.log(ctx.reply);
    });

//     // throw new Error("Method not implemented");
//     this.bot.action("choose_tour", (ctx) => {
//       this.chooseTour = [
//         `Сейчас мы подберем для вас горящий тур, ответьте пожалуйста на несколько вопросов
            
// Теперь давайте я подберу вам путешествие мечты

// Напишите текстом или отправьте голосовое сообщение с ответами на 3 вопроса 
            
// 1) Куда хотите отправиться?
// 2) Сколько Вас человек?
// 3) Какие у вас бюджет?`,
//       ];
//       ctx.editMessageText(`${this.chooseTour}`);
//     });

    // this.bot.action("course_turkey", (ctx) => {
    //     ctx.session.courseLike = true
    //     ctx.editMessageText("🇹🇷 Вас ждут Волны Эгейского моря и его прекрасные пляжи 🏖")
    // })
    // this.bot.action("course_egypt", (ctx) => {
    //     ctx.session.courseLike = false
    //     ctx.editMessageText("🇪🇬 Вам придстаит увидет Великие Пирамиды Гизы а также оазисы этих пустын🏝 и его обитателей🐫 ")
    // })
  }
}
