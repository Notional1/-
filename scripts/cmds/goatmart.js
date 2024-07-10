const axios = require('axios');

module.exports = {
  config: {
    name: "goatmart",
    version: "1.1",
    author: "ArYAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'View items available in the market'
    },
    longDescription: {
      en: "View items available in the market."
    },
    category: "market",
    guide: {
      en: '${p}goatmart [ itemID ]'
    }
  },

  onStart: async function ({ api, event, args }) {
    const serverURL = "https://goatmart-api.onrender.com";

    try {
      if (!args[0]) {
        api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nAvailable Choices:\n-> ${event.body} page < page number >\n-> ${event.body} code < item ID >\n-> ${event.body} show < item ID >\n-> ${event.body} upload < item details in JSON format >`, event.threadID);
      } else if (args[0] === "code") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items/${itemID}`);
        const codeX = await axios.get(response.data.pastebinLink);
        const codeExtracted = codeX.data;

        if (codeExtracted) {
          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nItem Name: ${response.data.itemName}\nItem ID: ${response.data.itemID}\nType: ${response.data.type || 'GoatBot' }\nAuthor: ${response.data.authorName}\nAdded on: ${new Date(response.data.timestamp).toLocaleString()}Item Code: \n${codeExtracted}`, event.threadID);
        } else {
          api.sendMessage("Item not found.", event.threadID);
        }
      } else if (args[0] === "page") {
        const pageNumber = parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items`);
        const items = response.data;
        const totalPages = Math.ceil(items.length / 5);
        const offset = (pageNumber - 1) * 5;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("Invalid page number.", event.threadID);
        } else {
          const pageItems = items.slice(offset, offset + 5);

          const itemDescriptions = pageItems.map(
            (item) =>
              `Item Name: ${item.itemName}
Item ID: ${item.itemID}
Description: ${item.description}
Author: ${item.authorName}
Added on: ${new Date(item.timestamp).toLocaleString()}
`
          );
          const itemInfo = itemDescriptions.join(`\n`);

          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nItems available in the market:\n${itemInfo}Use ${event.body.split(" ")[0]} [ show | code ] <item id> to view pastebin link or code.\nPage: [ ${pageNumber} / ${totalPages} ]`, event.threadID);
        }
      } else if (args[0] === "show") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items/${itemID}`);
        const item = response.data;

        if (item && itemID) {
          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━\n\nItem Name: ${item.itemName}\nItem ID: ${item.itemID}\nType: ${item.type || " GoatBot"}\nDescription: ${item.description}\nAuthor: ${item.authorName}\nAdded on: ${new Date(item.timestamp).toLocaleString()}\nPastebin Link: ${item.pastebinLink}`, event.threadID);
        } else {
          api.sendMessage("Item not found.", event.threadID);
        }
      } else if (args[0] === "author") {
        const authorName = args[1];
        const response = await axios.get(`${serverURL}/api/items/author/${authorName}`);
        const authorItems = response.data;

        if (authorItems.length > 0) {
          const itemDescriptions = authorItems.map(
            (item) =>
              `\nItem Name: ${item.itemName}
Item ID: ${item.itemID}
Description: ${item.description}
Added on: ${new Date(item.timestamp).toLocaleString()}
`
          );
          const itemInfo = itemDescriptions.join("\n");

          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nItems by ${authorName}\n${itemInfo}`, event.threadID);
        } else {
          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nNo items found for this author.`, event.threadID);
        }
      } else if (args[0] === "edit") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const newItemDetails = JSON.parse(args.slice(2).join(" "));
        const response = await axios.put(`${serverURL}/api/items/${itemID}`, newItemDetails);
        api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━\n\nItem edited successfully\nItem ID: ${response.data.itemID}\nItem Name: ${response.data.itemName}`, event.threadID);
      } else if (args[0] === "upload") {
        const itemDetails = JSON.parse(args.slice(1).join(" "));
        const response = await axios.post(`${serverURL}/api/items`, itemDetails);
        api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nItem uploaded successfully\nItem ID: ${response.data.itemID}\nItem Name: ${response.data.itemName}`, event.threadID);
      } else if (args[0] === "search") {
        const searchTerm = args.slice(1).join(" ").toLowerCase();
        const response = await axios.get(`${serverURL}/api/items`);
        const items = response.data;
        const matchingItems = items.filter(item => item.itemName.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm));

        if (matchingItems.length > 0) {
          const itemDescriptions = matchingItems.map(item => `\nItem Name: ${item.itemName}
Item ID: ${item.itemID}
Description: ${item.description}
Author: ${item.authorName}
Added on: ${new Date(item.timestamp).toLocaleString()}
`);
          const itemInfo = itemDescriptions.join("\n");

          api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nSearch Results for ${searchTerm}\n${itemInfo}`, event.threadID);
        } else {
          api.sendMessage("〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nNo items found matching the search term.", event.threadID);
        }
      } else {
        api.sendMessage("〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\n\nInvalid command.", event.threadID);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      api.sendMessage("❌| You are using invalid format!" + error.message, event.threadID);
    }
  },
};
