import { Context, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import axios from "axios";

export class StartCommand extends Command {
  aboutBot: string[] = [];
  chooseTour: string[] = [];
  messageText: string = "";
  chatId: number | undefined;
  // text: string | undefined;
  messageTextBudget: number | undefined ;
  webAppUrl: string = 'https://lucky-brigadeiros-dd2d36.netlify.app/'

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  // chatId: number;
  
  // обработчик
  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.from.first_name);
      console.log(ctx.from.username);
      // console.log(ctx)
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
      const message = ctx.message;
      if (message && 'text' in message) {
        const messageText = message.text;
        console.log('Текст сообщения:', messageText);
      }else {
        console.log("Not found text");
      }

      async function Budget() {
        console.log(message)
        await ctx.sendMessage("Какой у вас бюджет в $?")
        if (ctx.sendMessage) 
        if (message && 'text' in message) {
          const messageText = message.text;
          const messageBudget = Number.parseInt(messageText);
          // const messageBudget = 300
          if (messageBudget) {
            console.log('Текст budget:', messageBudget);
            // const locaton = 'https://maps.google.com/maps?q=41.341988,69.229491&ll=41.341988,69.229491&z=16'
            // Условие 
            if (messageBudget < 400) {
              // ctx.sendLocation(locaton)
              console.log("Not enought")
              ctx.sendMessage('Этого капитала не достаточно для путешествия😢')
            }else {
              ctx.sendMessage('Прекрасно😁')
              console.log("Good")
            }
          }
        }else {
          console.log("Not found text");
        }
      } 

      Budget()

      // this.bot.on('message', async (ctx) => {
      //   const message = ctx.message;
      //   if (message && 'text' in message) {
      //     console.log('GOOOOOOD');
      //     const messageTextBudget = message.text;
      //     return messageTextBudget
      //   }else {
      //     console.log("Not found text");
      //   }
      //   const budget = await Number(this.messageTextBudget)
      //   if (budget < 400) {
      //     console.log('Bad')
      //   }else {
      //     console.log('good')
      //   }
      //   ctx.reply('Какой у вас бюджет в $?')
      // })
      // Ваш API-ключ OpenAI
      const apiKey = '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';

      // eslint-disable-next-line @typescript-eslint/no-unused-vars


      // Функция для отправки запроса к API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async function sendMessage(message: string): Promise<string> {
        // let messageContent = ''
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'system', content: 'You are Alexander.' }, { role: 'user', content: message}],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          );

          // Получение ответа от API
          const choices = response.data.choices;
          const reply = choices[0].message.content;

          return reply;
        } catch (error) {
          console.error('Ошибка при отправке запроса к API:', error);
          throw error;
        }
      }

      // Пример использования
      // async function main() {

      //   const data = {
      //     // destination: "Dubai",
      //     user_input_in_russia: `Найди мне 3 тура в ${destination} из Ташкента с бюджетом 1000$ на весь тур и с отелем не менее 3 или 4 звезд и предоставь подробную информацию откуда и ты должен искать туры на сайте `,
      //     check_in: "2023-09-29",
      //     check_out: "2023-10-01",
      //     property_types: ["HOTEL"]
      //   };

      //   const reply : string = await sendMessage(JSON.stringify(data))
      //   console.log('Ответ ChatGPT:', reply);

      //   ctx.sendMessage(reply)
      // }

      // main();
    });
    
    // this.bot.on('message', (ctx) => {
    //   const message = ctx.message;
    //   if (message && 'text' in message) {
    //     const messageBudget = Number(message.text)
    //     console.log('Текст budget:', typeof messageBudget);
    //     // Условие 
    //     if(messageBudget < 400) {
    //       console.log("Good")
    //     }else {
    //       ctx.sendMessage('Этого капитала не достаточно для путешествия😢')
    //       console.log("Not enought")
    //     }
    //   }else {
    //     console.log("Not found text");
    //   }
    // })
  }
}


