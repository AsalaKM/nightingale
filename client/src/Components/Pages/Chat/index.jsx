import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// import styles
import "./index.css";
import { ChatWindow, ConversationView, MessageBox, Form } from "./index.style";

class Chat extends Component {
  // userMessage contains user input
  // botMessage contains dialogflow responses
  // conversation holds each message in conversation
  state = {
    botMessage: "",
    userMessage: "",
    conversation: []
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    // create new Pusher
    const pusher = new Pusher("42ea50bcb339ed764a4e", {
      cluster: "eu",
      encrypted: true
    });
    // listening for the bot-response event on the bot channel, event gets triggered on the server and passed the response of the bot through the event payload coming from dialogflow
    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      // setup bot response
      const botMsg = {
        text: data.message,
        user: "ai"
      };
      // update state with every incoming bot response
      this.setState({
        botMessage: botMsg.text,
        conversation: [...this.state.conversation, botMsg]
      });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // allows the displayed value to update as the user types
  handlechange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Remove whitespace from both sides of a string:
    if (!this.state.userMessage.trim()) return;
    // set up user message to be sent to backend
    const msgHuman = {
      text: this.state.userMessage,
      user: "human"
    };

    this.setState({
      conversation: [...this.state.conversation, msgHuman]
    });

    // 1) post request to pusher route for rendering
    axios.post("http://localhost:8080/api/bot/chat", {
      message: this.state.userMessage
    });

    // 2) post request to storage route
    // axios.post("http://localhost:8080/api/bot/messages", {
    //   message: this.state.userMessage
    // });

    // after POST request, clearing the input field by setting the value of userMessage to an empty string.
    this.setState({ userMessage: "" });
  };

  render() {
    // set up function that renders text by human or ai (defined as className)
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    // loop over conversation array and create chatBubbles for human and bot
    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <ChatWindow>
          <ConversationView>{chat}</ConversationView>
          <MessageBox>
            <Form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onInput={this.handlechange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit enter to send"
              />
            </Form>
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </MessageBox>
        </ChatWindow>
      </div>
    );
  }
}

export default Chat;
