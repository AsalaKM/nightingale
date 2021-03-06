const express = require("express");

const router = express.Router();

const login = require("./login");
const register = require("./register");
const conversations = require("./conversations");
const messages = require("./messages");
const dashboard = require("./dashboard");
const auth = require("./../../passport")();
const logout = require("./logout");
const currentConversation = require("./current_conversation");

router.post("/user/register", register);
router.post("/user/login", login);
router.use("/user/logout", logout);
router.get("/user/conversations/:conversationId", auth.authenticate(), messages);

// authenticated routes
router.get("/user/dashboard", auth.authenticate(), dashboard);
router.get("/user/conversations", auth.authenticate(), conversations);
router.get("/user/current-conversation", auth.authenticate(), currentConversation);

module.exports = router;
