<h1 align='center'>🤖 Whatsapp Bot</h1>

<p align='center'>A bot for WhatsApp created using <a href="https://github.com/pedroslopez/whatsapp-web.js"> a library that simulates real-time WhatsApp Web connection.</a></p>

## 👍 Acknowledgments and Credits

- [@pedroslopez](https://github.com/pedroslopez)
  
- [@caioagiani](https://github.com/caioagiani)
  

## 🛠 Technologies

This project was developed using the following technologies:

- [Whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
  
- [NodeJS](https://nodejs.org/)
  
- [Typescript](https://typescriptlang.org/)
  
- [node-base64-image]()
  
- [qrcode-terminal](https://www.npmjs.com/package/node-base64-image)
  
- [Axios](https://www.npmjs.com/package/axios)
  

## 📱💻 Instructions

Assuming you already have [Node](https://nodejs.org) installed.

```
## 1. Clone the repository

git clone https://github.com/guivictorr/whatsapp-bot.git



## 2.  Enter the folder

cd whatsapp-bot



## 3. Install dependencies

npm i



## 4. Configure the .env file



## 5. Run the application

npm run dev



## 6. Scan the QR code that appears in the terminal
```

## ❗ Commands

- !gpt [prompt]
  
- !dalle [prompt]
  
- !covid state
  
- !cotacao
  
- !profile
  
- !sticker
  
- !idontever
  
- !members **(Group)**
  
- !profile @contact **(Group)**
  
- !ban @contact **(Group)**
  

---

### 🔨 Creating Commands

To create commands, simply create a `.ts` file in one of the `group` folders for commands valid only in groups or `global` for globally valid commands.

Example:

```ts
const commandName = async (msg: Message, args: string[]): Promise<Message> => {
  // some code
  return msg.reply('Hello World'); // return msg.reply(string)
};

export default commandName;
```

Once the file is created, the command will be functional.

### 🤖 Open AI

To use the `!gpt` and `!dalle` commands, you need to add environment variables:

You can obtain these credentials by creating an account on the OpenAI website.

- OPENAI_API_KEY [Click here](https://beta.openai.com/account/api-keys)
  
- OPENAI_ORG_ID [Click here](https://beta.openai.com/account/org-settings)
  

### 📌 Animated Stickers

To use the !sticker command with gifs and videos, it is necessary for you to:

1. Download **[FFMPEG](https://ffmpeg.org/)**
  
2. In the `.env` file, configure the `FFMPEG_PATH` environment variable with the path to ffmpeg
  

💡 You can try using the `whereis ffmpeg` command to find the path.

---

## 🤔 How to Contribute

- Fork this repository;
  
- Create a branch with your feature: `git checkout -b my-feature`;
  
- Commit your changes: `git commit -m 'feat: My new feature'`;
  
- Push to your branch: `git push origin my-feature`.
  
Once your pull request is merged, you can delete your branch.
  

## ❗ Disclaimer

This project is not affiliated, associated, authorized, endorsed by,
or in any way officially connected with WhatsApp or any of its subsidiaries or affiliates. The official WhatsApp website can be found at [https://whatsapp.com](https://whatsapp.com/).
"WhatsApp" as well as names, brands, logos, and related images are registered trademarks of their respective owners.