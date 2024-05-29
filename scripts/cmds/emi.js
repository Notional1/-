const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports = {
  config: {
    name: "emi",
    version: "1.1",
    author: "MR.SANNY",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Generate anime images based on emi style.'
    },
    longDescription: {
      en: "Generate anime images based on emi style."
    },
    category: "media",
    guide: {
      en: "$p}emi < prompt >"
    }
  },

  onStart: async function({ message, args, event }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt = text;

    try {
      message.reply("⏰🤨 Creating your Imagination😇...").then((info) => { id = info.messageID });

      const API = `https://himachalwale.onrender.com/api/emi?prompt=${encodeURIComponent(prompt)}&apikey=©himachalwale`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        body: `🖼️|🧨 𝗘𝗠𝗜\n━━━━━━━━━━━━━━`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate your imagination.");
    }
  }
};
