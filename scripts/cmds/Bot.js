const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
};

module.exports.config = {
  name: "bby",
  version: "1.0.0",
  role: 0,
  author: "dipto", //modified by xnil
  description: "better than all Sim simi with multiple conversation",
  guide: { en: "[message]" },
  category: "ChatBots",
  coolDowns: 5,
};

module.exports.onReply = async function ({ api, event }) {
  if (event.type === "message_reply") {
    const reply = event.body.toLowerCase();
    if (isNaN(reply)) {
      try {
        const baseUrl = await baseApiUrl();
        const response = await axios.get(`${baseUrl}/baby?text=${encodeURIComponent(reply)}`);
        const ok = response.data.reply;
        await api.sendMessage(
          ok,
          event.threadID,
          (error, info) => {
            if (!error) {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: ok,
              });
            }
          },
          event.messageID,
        );
      } catch (error) {
        console.error(`Failed to get a reply: ${error.message}`);
        api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
      }
    }
  }
};

module.exports.onChat = async function ({ event, api }) {
  const body = event.body && event.body.toLowerCase().trim();
  if (body === "bby") {
    api.sendMessage("Please provide a question to answer\n\nExample:\nbaby ki koro", event.threadID, event.messageID);
  } else if (body.startsWith("bot")) {
    const query = body.slice(4).trim();
    if (query) {
      try {
        const baseUrl = await baseApiUrl();
        const response = await axios.get(`${baseUrl}/baby?text=${encodeURIComponent(query)}`);
        const reply = response.data.reply;
        await api.sendMessage(
          { body: reply },
          event.threadID,
          (error, info) => {
            if (!error) {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: reply,
              });
            }
          },
          event.messageID,
        );
      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        api.sendMessage(`Error: ${error.message}.\nAn error occurred.`, event.threadID, event.messageID);
      }
    }
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
    const query = args.join(" ").toLowerCase();
    if (!query) {
      api.sendMessage(
        "Please provide a question to answer\n\nExample:\nbaby ki koro",
        event.threadID,
        event.messageID,
      );
      return;
    }
    const baseUrl = await baseApiUrl();
    const response = await axios.get(`${baseUrl}/baby?text=${encodeURIComponent(query)}`);
    const reply = response.data.reply;
    await api.sendMessage(
      { body: reply },
      event.threadID,
      (error, info) => {
        if (!error) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: reply,
          });
        }
      },
      event.messageID,
    );
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(`${error.message}.\nAn error occurred.`, event.threadID, event.messageID);
  }
};
