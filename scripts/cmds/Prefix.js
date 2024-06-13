module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "MR.SANNY",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `

𝗠𝗥 𝗣𝗥𝗘𝗙𝗜𝗫: "┏━━ [🥷 𝗠𝗥 𝗦𝗔𝗡𝗡𝗬-𝗕𝗢𝗧 🤖 ]━━➣\n┃⚔️ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗽𝗿𝗲𝗳𝗶𝘅: [ %1 ]\n┃⚜️ 𝗬𝗼𝘂𝗿 𝗯𝗼𝘅 𝗰𝗵𝗮𝘁 𝗽𝗿𝗲𝗳𝗶𝘅: [ %2 ]\n┗━━━━━━━━━━━━➢"


━━━━━━━━━━━━━━━

🎤 𝗛𝗘𝗟𝗟𝗢! Ȋ̈T̑̈ L̑̈Ȏ̈Ȏ̈K̑̈'s L̑̈Ȋ̈K̑̈Ȇ̈ Y̑̈Ȏ̈Ȗ̈ 'Ȓ̈Ȇ̈ N̑̈Ȏ̈T̑̈ F̑̈Ȃ̈M̑̈Ȋ̈L̑̈L̑̈Ȋ̈Ȃ̈Ȓ̈ W̑̈Ȋ̈T̑̈H̑̈ M̑̈Y̑̈ P̸R̸E̸F̸I̸X̸!, H̸E̸R̸E̸'s A̸ G̸u̸i̸r̸e̸, U̸E̸E̸ T̑̈H̑̈Ȋ̈S̑̈💛 
👑 𝗦𝗬𝗦𝗧𝗘𝗠 𝗣𝗥𝗘𝗙𝗜𝗫:➡【+】
🐰 𝗕𝗢𝗫 𝗖𝗛𝗔𝗧 𝗣𝗥𝗘𝗙𝗜𝗫:➡ 【+】

📌 𝗛𝗢𝗪 𝗧𝗢 𝗨𝗦𝗘 𝗠𝗘 𝗘𝗩𝗘𝗥𝗬𝗢𝗡𝗘 ⚔️
𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐀𝐥𝐚𝐢𝐤𝐮𝐦 ...💛
𝐈𝐌 𝐌𝐑 𝐒𝐀𝐍𝐍𝐘 𝐀𝐈....🤖
..𝗬𝗢𝗨 treat 𝗠𝗘 well, I'll 𝗚𝗲𝘁 along with 𝗬𝗼𝘂, if you do 𝗕𝗔𝗗,
𝗦omething terrible will 𝗛𝗮𝗽𝗽𝗲𝗻..☠️

⚙ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧  𝐒𝐞𝐞 𝐘𝐨𝐮 ⏰
➖ 𝐍𝐀𝐌𝐄 ⚔️ [𝐒𝐀𝐇𝐀𝐑𝐔𝐋 𝐈𝐒𝐋𝐀𝐌 𝐒𝐀𝐍𝐘 👑 ] 
➖ 𝐂𝐍𝐓𝐀𝐂𝐊 📥 [📞 01636591146 ]
➖ 𝐒𝐓𝐀𝐓𝐔𝐒 ♀️ [ .𝐒𝐈𝐍𝐆𝐋𝐄 📢]
➖ 𝐇𝐎𝐌𝐄 🏠 [ .𝐌𝐘𝐌𝐄𝐍𝐒𝐈𝐍𝐆𝐇 🪧]
➖ 𝐃𝐑𝐄𝐀𝐌 🏍️[𝐑1.5 𝐕.𝐌 𝐈𝐍_𝐒𝐇𝐀_𝐀𝐋𝐀𝐇]
...𝐓𝐡𝐚𝐧𝐤 𝐘𝐨𝐮 𝐄𝐯𝐞𝐫𝐲𝐨𝐧𝐞 ,☃️📝

📌𝐀𝐃𝐌𝐈𝐍 -🔒- : 𝐌𝐑 𝐒𝐀𝐍𝐍𝐘 🕵️‍♂️`,
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/Axi1aS9.mp4")
 });
 }
 }
}
