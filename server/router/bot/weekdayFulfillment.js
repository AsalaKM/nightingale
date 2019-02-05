const {
  WebhookClient, Suggestion, Payload, Card, Text,
} = require("dialogflow-fulfillment");

exports.mood = (agent) => {
  agent.add(new Text("Hi! 👋"));
  agent.add(new Text("How was your school day?"));
  agent.add(new Suggestion("Amazing"));
  agent.add(new Suggestion("Good"));
  agent.add(new Suggestion("Meh"));
  agent.add(new Suggestion("Not great"));
  agent.add(new Suggestion("Terrible"));
};

exports.positive = (agent) => {
  agent.add(new Text("I am really happy to hear that! 🤗 It's always nice to have a good day."));
  agent.add(new Text("So come on spill, why was it a good day?"));
  agent.add(new Suggestion("Good lessons"));
  agent.add(new Suggestion("Had a fun time"));
  agent.add(new Suggestion("Overcame a challenge"));
  agent.add(new Suggestion("Did well"));
  agent.add(new Suggestion("Other"));
};

exports.dontUsuallyEnjoyLesson = (agent) => {
  agent.add(new Text("What was it about this lesson that made you enjoy it this time?"));
  agent.add(new Suggestion("It was interesting"));
  agent.add(new Suggestion("I did well!"));
  agent.add(new Suggestion("I had fun with my friends"));
  agent.add(new Suggestion("My teacher was nice to me"));
};
