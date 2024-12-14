<h1 align='center'>🤖 Whatsapp Bot</h1>
<p align='center'>Um bot para o whatsapp feito usando <a href="https://github.com/pedroslopez/whatsapp-web.js">uma biblioteca que simula a conexão do Whatsapp Web em tempo real.</a></p>

English README [here](https://github.com/guivictorr/whatsapp-bot/blob/master/README-ENG.md)

## 👍 Agradecimentos e Créditos

- [@pedroslopez](https://github.com/pedroslopez)
- [@caioagiani](https://github.com/caioagiani)

## 🛠 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [NodeJS](https://nodejs.org/)
- [Typescript](https://typescriptlang.org/)
- [qrcode-terminal](https://www.npmjs.com/package/node-base64-image)

## 📱💻 Instruções

Partindo do pressuposto de que você já tenha o [Node](https://nodejs.org) instalado.

```
## 1. Clonar repositório
git clone https://github.com/guivictorr/whatsapp-bot.git

## 2. Entrar na pasta
cd whatsapp-bot

## 3. Instalar as dependências
pnpm install

## 4. Configurar o arquivo .env

## 5. Rodar a aplicação
pnpm run dev

## 6. Escanear o qrcode que aparece no terminal
```

---

### 🔨 Criar comandos

Para criar comandos basta criar um arquivo `.ts` na pasta /commands

Exemplo:

```ts
export default async function commandName(
  msg: Message,
  args: string[],
): Promise<Message> {
  // some code
  return msg.reply('Hello World');
}

export default commandName;
```

### 📌 Figurinhas animadas

Para conseguir usar o comando !figurinha em gifs e vídeos é necessário:

1. Baixar o **[FFMPEG](https://ffmpeg.org/)**
2. No arquivo `.env` configurar a variável de ambiente `FFMPEG_PATH` com o caminho
   para o ffmpeg

💡 Você pode tentar usar o comando `whereis ffmpeg` para achar o caminho

---

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## ❗ Isenção de Responsabilidade

Este projeto não é afiliado, associado, autorizado, endossado por,
ou de qualquer forma oficialmente conectado com o WhatsApp ou qualquer
uma de suas subsidiárias ou suas afiliadas. O site oficial do WhatsApp pode ser encontrado em https://whatsapp.com.
"WhatsApp" bem como nomes, marcas, emblemas e imagens relacionadas são marcas registradas de seus respectivos proprietários.
