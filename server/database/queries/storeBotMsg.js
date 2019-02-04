const Message = require("../models/Message");

const storeBotMsg = (userId, messages, conversationId) => new Promise((resolve, reject) => {
  // fulfillment messages is always an array
  // filter to only get the objects where the message === 'text'
  // by doing this we don't store Suggestions, Cards that we don't want

  const textMessages = messages.filter(message => message.message === "text");
  console.log("textMessages", textMessages);

  textMessages.map((message) => {
    const newMessage = new Message({
      conversation: conversationId,
      text: message.text.text,
      sender: "bot",
    });

    console.log("message", newMessage);

    return newMessage
      .save()
      .then(resolve)
      .catch(err => reject(err));
  });
});

module.exports = storeBotMsg;
