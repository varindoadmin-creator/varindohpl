// The chat assistant (the bubble on every page) is hidden: the website chats
// were ~95% of the Anthropic bill, as each reply re-sends the whole product
// list to Claude. While false, the bubble is not shown and /api/chat answers
// 503 without calling Claude. Set true to bring it back.
export const AI_CHAT_ENABLED = false;
