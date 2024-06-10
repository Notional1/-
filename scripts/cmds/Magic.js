+cmd install magic.js const axios = require('axios');

module.exports = {
  config: {
    name: "magic",
    version: "1.1",
    author: "MR SANNY",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Generate images from text prompts using the Bing image generation API. This tool allows users to create visual representations from descriptive text inputs. Ideal for creative projects, brainstorming, and visualization."
    },
    category: "image",
    guide: {
      en: '{pn} your prompt\n\nExample:\n1. {pn} a futuristic cityscape at sunset\n2. {pn} a serene mountain landscape with a river\n3. {pn} a portrait of a cyberpunk character'
    }
  }, 

  onStart: async function ({ api, event, args, message, usersData }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("❓| Please provide a prompt. For example, 'a futuristic cityscape at sunset'. This helps us generate the most accurate images for you. Ensure your prompt is descriptive enough for better results.");
    }

    const prompt = text;

    message.reply("✅| Creating your Imagination... This might take a moment. Please be patient as we bring your ideas to life.", async (err, info) => {
      if (err) return console.error(err);

      const ui = info.messageID;
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      try {
        const response = await axios.get(`https://itsaryan.onrender.com/api/bing?prompt=${encodeURIComponent(prompt)}`);
        api.setMessageReaction("✅", event.messageID, () => {}, true);

        // Validate that response.data is an array
        const images = Array.isArray(response.data) ? response.data : [];
        
        if (images.length === 0) {
          throw new Error("No images returned from API. Try rephrasing your prompt or using different keywords.");
        }

        message.unsend(ui);
        const attachments = await Promise.all(images.map(img => global.utils.getStreamFromURL(img)));
        message.reply({
          body: `Magic🤨\n━━━━━━━━━━━━\n\nHere are the images generated based on your prompt: "${prompt}". If you have further requests, feel free to ask!`,
          attachment: attachments
        });
      } catch (error) {
        console.error(error);
        let errorMessage = "❌ An error occurred while generating the images.";
        if (error.response) {
          // Server responded with a status other than 200 range
          errorMessage += ` Server responded with status ${error.response.status}. Please try again later.`;
        } else if (error.request) {
          // No response was received
          errorMessage += " No response received from the server. Please check your network connection.";
        } else {
          // Other errors
          errorMessage += ` Error: ${error.message}. Please try again with a different prompt or contact support.`;
        }
        message.unsend(ui);
        api.sendMessage(errorMessage, event.threadID);
        api.setMessageReaction("❌", event.messageID, () => {}, true);
      }
    });
  }
};
