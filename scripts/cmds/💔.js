const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports = {
    config: {
        name: "💔",
        version: "1.0",
        author: "MODIFY BY XNIL", 
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
    onStart: async function() {}, 
    onChat: async function({ event, message, getLang }) {
        if (event.body && event.body.toLowerCase() == "💔") {
            const videoUrl = "https://i.imgur.com/1etALWL.mp4"; // Replace with your video URL
            const videoPath = path.resolve(__dirname, 'cliff.mp4');

            try {
                const response = await axios({
                    url: videoUrl,
                    method: 'GET',
                    responseType: 'stream'
                });

                const writer = fs.createWriteStream(videoPath);

                response.data.pipe(writer);

                writer.on('finish', () => {
                    const videoStream = fs.createReadStream(videoPath);
                    return message.reply({
                        body: "-ভালো তাকেই বাসো
..!!যার ভিতর সারাক্ষণ তোমাকে..!
___হারানোর ভয় থাকে..💔🙂",
                        attachment: videoStream
                    });
                });

                writer.on('error', () => {
                    throw new Error('Error writing the video to file');
                });
            } catch (error) {
                console.error('Error downloading the video:', error);
                return message.reply("Failed to download the video.");
            }
        }
    }
};
