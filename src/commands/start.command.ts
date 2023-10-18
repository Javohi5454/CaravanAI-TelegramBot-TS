// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Context, Markup, Telegraf, Composer, session, Scenes } from "telegraf";
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
    // const myScene = new Scenes.BaseScene<Context>('myScene');
    // const stage = new Scenes.Stage<Context>([myScene]);
    
    // const menuScene = new Scenes.WizardScene('scneneWizard', startWizard);
    // start
    this.bot.start(async (ctx) => {
      console.log(ctx.from.first_name);
      console.log(ctx.from.username);
      
      this.aboutBot = [
        `Здрствуйте ${ctx.from.first_name},
            
Вас приветствует ТурАгенство Caravan Tourizm, 

Я являюсь вашим ТурСопровадителем основаном на Исскуственном Интелекте первом в Узбекистане

Если вы нехотите подбират тур самому то просим вас нажмат на кнопку "AirCaravan"

`,
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
    this.bot.hears('Связатся с нами ☎️', async (ctx) => {
      // const contactNumber = '+998970396454'
      await ctx.sendMessage('с нетерпением ждем вас звонок😊📞')
      await ctx.replyWithContact('+998998970396454', 'Связатся с нами📞')
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
              await ctx.sendMessage('Просим вас поднять планку в бюджету для вашего будещего путиществия и внизу нажать внизу сделать тур с помощью ИИ 🤖')
            } else {
              ctx.sendMessage('Прекрасно 😁');
              ctx.sendMessage('Выберите примерную продолжительность тура (в днях):')
              
              console.log("Good");
              // Ваши дальнейшие действия с переменными messageText и messageTextBudget
            }
          }
        }
      } else {
        console.log("Not found text");
      }

    });
    // const stage = new Scenes.Stage<Context>([myScene]);
    
    // myScene.on('text', async (ctx) => {
    //   const message = ctx.message.text;
    //   await ctx.reply(`Вы написали: ${message}`);
    // });
    // this.bot.use(session());
    // this.bot.use(stage.middleware());
  }
}



// const scenarioTypeScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');

// scenarioTypeScene.enter((ctx) => {
//   ctx.session.myData = {};
//   ctx.reply('What is your drug?', Markup.inlineKeyboard([
//     Markup.button.callbackButton('Movie', 'MOVIE_ACTION'),
//     Markup.button.callbackButton('Theater', 'THEATER_ACTION')
//   ]));
// });

// scenarioTypeScene.action(THEATER_ACTION, (ctx) => {
//   ctx.reply('You choose theater');
//   ctx.session.myData.preferenceType = 'Theater';
//   return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
// });

// scenarioTypeScene.action(MOVIE_ACTION, (ctx) => {
//   ctx.reply('You choose movie, your loss');
//   ctx.session.myData.preferenceType = 'Movie';
//   return ctx.scene.leave(); // exit global namespace
// });

// scenarioTypeScene.leave((ctx) => {
//   ctx.reply('Thank you for your time!');
// });

// // What to do if user entered a raw message or picked some other option?
// scenarioTypeScene.use((ctx) => ctx.replyWithMarkdown('Please choose either Movie or Theater'));
    
