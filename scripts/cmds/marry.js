const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "marry",
        version: "1.0",
        author: "MR.SANNY",
        countDown: 0,
        role: 0,
        shortDescription: "get a wife",
        longDescription: "",
        category: "marry",
        guide: "{pn}"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
      if(mention.length == 0) return message.reply("🤧 𝗡𝗘𝗘𝗗𝗘𝗗 𝗠𝗘𝗡𝗧𝗔𝗜𝗢𝗡\n\n🥀 Please mention someone");
else if(mention.length == 1){
const one = event.senderID, two = mention[0];
                bal(one, two).then(ptth => { message.reply({ body: "🥰 𝗪𝗜𝗟𝗟 𝗬𝗢𝗨 𝗠𝗔𝗔𝗥𝗬 𝗠𝗘\n\n💝 𝐋𝐎𝐕𝐄 𝐐𝐔𝐎𝐓𝐄\n🥀You are the sunshine in my day and the moonlight of my nights. You are the love of my life, and I can't imagine living without you.\n\n「 Love you Babe🥰❤️ 」", attachment: fs.createReadStream(ptth) }) })
} else{
 const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "🥰 𝗪𝗜𝗟𝗟 𝗬𝗢𝗨 𝗠𝗔𝗔𝗥𝗬 𝗠𝗘\n\n💝 𝐋𝐎𝐕𝐄 𝐐𝐔𝐎𝐓𝐄\n🥀You are the sunshine in my day and the moonlight of my nights. You are the love of my life, and I can't imagine living without you.\n\n「 Love you Babe🥰❤️ 」" , attachment: fs.createReadStream(ptth) }) })
}
    }


};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "marry2.png"
    let img = await jimp.read("https://i.ibb.co/5TwSHpP/Guardian-Place-full-1484178.jpg")

    img.resize(600, 338).composite(avone.resize(75, 75), 262, 0).composite(avtwo.resize(80, 80), 350, 69);

    await img.writeAsync(pth)
    return pth
      }