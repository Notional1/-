Command executed successfully:
const axios = require('axios');

module.exports = {
  config: {
    name: "font",
    version: "1.3",
    author: "ArYAN",
    shortDescription: { en: 'Fetch fonts using an API' },
    longDescription: { en: "This command allows you to fetch fonts using a specified API and send the response back to the user." },
    role: 0,
    guide: { en: 'Type !font <text> <fontType> to fetch font information. Use "|" to split multiple parts of the text.' }
  },

  onStart: async function ({ api, event, args, message }) {
    const fonts = [
      'cursive', 'sans', 'bold', 'monospace', 'sbd', 'fraktur', 'italic', 'glitchy', 
      'baybayin', 'creepy', 'morse', 'bubbles', 'boxed', 'smiley', 'covered', 'crossed', 
      'kombo', 'boldex'
    ];

    if (args.length < 2) {
      message.reply(`📒 𝗙𝗼𝗻𝘁 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━━━\n\n1. cursive - 𝓗𝓔𝓛𝓛𝓞\n2. sans - 𝖧𝖤𝖫𝖫𝖮\n3. bold - 𝗛𝗘𝗟𝗟𝗢\n4. monospace - 𝙷𝙴𝙻𝙻𝙾\n5. sbd - 𝐇𝐄𝐋𝐋𝐎\n6. fraktur - ℌ𝔈𝔏𝔏𝔒\n7. italic - 𝐻𝐸𝐋𝐿𝐎\n8. glitchy - 卄ΞↃↃӨ\n9. baybayin - ᜑᜌᜋᜋᜉ\n10. creepy - ђєll๏\n11. morse - ......-...-..---\n12. bubbles - ⒽⒺⓁⓁⓄ\n13. box - 🄷🄴🄻🄻🄾 \n14. smiley - H̆̈Ĕ̈L̆̈L̆̈Ŏ̈\n15. covered- H̺͆E̺͆L̺͆L̺͆O̺͆\n16. crossed - H̶E̶L̶L̶O̶\n17. kombo - 🅷🅻🅴🅴🅾\n18. boldex - 【h】【E】【L】【L】【O】\n\n📚 𝗨𝘀𝗮𝗴𝗲:\n{p} 𝖿𝗈𝗇𝗍 ( 𝗧𝗲𝘅𝘁 ) | ( 𝗡𝘂𝗺𝗯𝗲𝗿 )`);
      return;
    }

    const text = args.slice(0, -1).join(' ');
    const [prompt, model] = text.split('|').map((part) => part.trim());
    const selectedModel = model || args[args.length - 1];

    let fontType = selectedModel;
    if (!isNaN(fontType)) {
      const fontIndex = parseInt(fontType, 10) - 1;
      if (fontIndex >= 0 && fontIndex < fonts.length) {
        fontType = fonts[fontIndex];
      } else {
        message.reply('Invalid font number. Please provide a valid font type.');
        return;
      }
    }

    try {
      const apiUrl = `https://global-sprak.onrender.com/api/font?text=${encodeURIComponent(prompt)}&fontType=${encodeURIComponent(fontType)}`;
      const response = await axios.get(apiUrl);
      message.reply(response.data.result);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the font information.');
    }
  }
};
