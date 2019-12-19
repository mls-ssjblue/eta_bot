let telegram_url = "no" + process.env.TELEGRAM_API_TOKEN + "/sendMessage";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios=require("axios");
require("dotenv").config();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.get("/",(req,res) => {
    res.render('index_windows')
})
app.post("/start_bot", function (req, res) {
    const {message} = req.body;
    let reply = "Welcome to telegram ETA bot";
    let city_check = message.text.toLowerCase().indexOf('/');
    if (message.text.toLowerCase().indexOf("hi") !== -1) {
        sendMessage(telegram_url, message, reply, res);
    } else if ((message.text.toLowerCase().indexOf("check") !== -1) && (city_check !== -1)) {
        city = message.text.split('/')[1];
        sendMessage("hey there")
        // get_forecast(city).then(response => {
        //     post_forecast(telegram_url, response, message, res)
        // });
    } else {
        reply = "request not understood, please review and try again.";
        sendMessage(telegram_url, message, reply, res);
        return res.end();
    }
});
app.listen(3000, () => console.log("Telegram bot is listening on port 3000!"));



function sendMessage(url, message, reply, res) {
    axios.post(url, {
        chat_id: message.chat.id,
        text: reply
    }).then(response => {
        console.log("Message posted");
        res.end("ok");
    }).catch(error => {
        console.log(error);
    });
}