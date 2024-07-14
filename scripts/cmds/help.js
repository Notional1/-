const fs = require('fs');
const path = require('path');

function apply(text, fontMap) {
  return text.replace(/[a-zA-Z0-9]/g, (char) => fontMap[char] || char);
}

const sans = {
  a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁",
  i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉",
  q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑",
  y: "𝗒", z: "𝗓", A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥",
  G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭",
  O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵",
  W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹", "0": "𝟢", "1": "𝟣", "2": "𝟤", "3": "𝟥",
  "4": "𝟦", "5": "𝟧", "6": "𝟨", "7": "𝟩", "8": "𝟪", "9": "𝟫",
};

const bold = {
  a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵",
  i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽",
  q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅",
  y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙",
  G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡",
  O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩",
  W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯",
  "4": "𝟰", "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵",
};

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "ArYAN © modified by SaNnY", //don't change my credits please 
    countDown: 5,
    role: 0,
    longDescription: {
      en: "This command allows you to see all available commands list"
    },
    category: "guide",
    guide: {
      en: "To use this command, type ${prefix}help [ empty || CommandName ]"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const commandFiles = fs
        .readdirSync(path.join(__dirname, '..', 'cmds'))
        .filter((file) => file.endsWith(".js"));

      const commands = commandFiles.map(file => {
        try {
          return require(path.join(__dirname, '..', 'cmds', file));
        } catch (err) {
          console.error(`Error loading command ${file}:`, err);
          return null;
        }
      }).filter(cmd => cmd !== null);

      const itemsPerPage = 16; // Number of commands to show per page
      const totalPages = Math.ceil(commands.length / itemsPerPage);

      let page = 1;
      if (args.length > 0 && !isNaN(args[0])) {
        page = parseInt(args[0], 16);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
      }

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      let helpMessage = `|🦅 👑 𝗦 𝗮 𝗡 𝗻 𝗬  𝗕𝗢𝗧 👑 🦅\n\n`;
      for (let i = startIndex; i < endIndex && i < commands.length; i++) {
        const { name, role, longDescription } = commands[i].config;
        helpMessage += apply(`├─${role === 2 ? "👑 | " : "🐒🍍 | "}${name}\n`, bold);
        helpMessage += apply(`│    ${longDescription && longDescription.en ? longDescription.en : "No description available"}\n`, sans);
        helpMessage += apply(`├─────────────✨🦅\n`, sans);
      }

      const totalCommands = commands.length;
      helpMessage += `├─🕯️𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 ${totalCommands} 𝗧𝗼𝘁𝗮𝗹 𝗽𝗮𝗴𝗲: ${page}/${totalPages}\n`;
      helpMessage += apply(`│ 👑 𝗠𝗮𝗱𝗲 𝗪𝗶𝘁𝗵 🔏⛱️ 𝗕𝘆 𝗦 𝗮 𝗡 𝗻 𝗬 ⛱️🔏\n`, sans);
      helpMessage += apply(`╰───────────────✨🦅\n`, sans);

      const helpListImages = [
        "https://i.imgur.com/jxfRX2J.jpeg",
        "https://i.imgur.com/EBXZLSy.jpeg",
        "https://i.imgur.com/rCjCA4o.jpeg",
        "https://i.imgur.com/kC6DZsy.mp4", 
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      api.sendMessage({
        body: helpMessage,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error("Error in help command:", error);
      api.sendMessage("An error occurred while executing the command.", event.threadID, event.messageID);
    }
  },
};
