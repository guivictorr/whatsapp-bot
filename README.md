<h1 align='center'>🤖 Whatsapp Bot</h1>
<p align='center'>Um bot para o whatsapp feito usando <a href="https://github.com/pedroslopez/whatsapp-web.js">uma biblioteca que simula a conexão do Whatsapp Web em tempo real.</a></p>

## 👍 Agradecimentos e Créditos

- [@pedroslopez](https://github.com/pedroslopez)
- [@caioagiani](https://github.com/caioagiani)

## 🛠 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [NodeJS](https://nodejs.org/)
- [Typescript](https://typescriptlang.org/)
- [node-base64-image]()
- [qrcode-terminal](https://www.npmjs.com/package/node-base64-image)
- [Axios](https://www.npmjs.com/package/axios)

## 📱💻 Instruções

Partindo do pressuposto de que você já tenha o [Node](https://nodejs.org) instalado.

```
## 1. Clonar repositório
git clone https://github.com/guivictorr/whatsapp-bot.git

## 2. Entrar na pasta
cd whatsapp-bot

## 3. Instalar as dependências
npm i

## 4. Configurar o arquivo .env

## 5. Rodar a aplicação
npm run dev

## 6. Escanear o qrcode que aparece no terminal
```

## ❗ Comandos

- !gpt [prompt]
- !dalle [prompt]
- !covid uf
- !cotacao
- !perfil
- !figurinha
- !eununca
- !membros **(Grupo)**
- !perfil @contato **(Grupo)**
- !ban @contato **(Grupo)**

---

### 🔨 Criar comandos

Para criar comandos basta criar um arquivo `.ts` em uma das pastas `group` para comandos válidos apenas em grupos ou `global` para comandos válidos globalmente.

Exemplo:

```ts
const commandName = async (msg: Message, args: string[]): Promise<Message> => {
  // some code
  return msg.reply('Hello World'); // return msg.reply(string)
};

export default commandName;
```

Depois que o arquivo é criado o comando já ai estar funcionando

### 🤖 Open AI

Para conseguir usar os comandos `!gpt` e `!dalle` é preciso adicionar as variáveis de ambiente

Você consegue essas credenciais criando uma conta no site da Open AI

- OPENAI_API_KEY [Clique aqui](https://beta.openai.com/account/api-keys)
- OPENAI_ORG_ID [Clique aqui](https://beta.openai.com/account/org-settings)

### 📌 Figurinhas animadas

Para conseguir usar o comando !figurinha em gifs e vídeos é necessário:

1. Baixar o **[FFMPEG](https://ffmpeg.org/)**
2. No arquivo `.env` configurar a variável de ambiente `FFMPEG_PATH` com o caminho
   para o ffmpeg

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
