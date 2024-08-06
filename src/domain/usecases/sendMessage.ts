import { Message } from "../entities/Message";
import { chatbotApi } from "../../data/chatbotApi";

export const sendMessage = async (
  content: string,
  onUpdate: (message: Message) => void,
) => {
  const stream = await chatbotApi.getBotResponseStream(content);

  const botMessage: Message = {
    id: (Date.now() + 1).toString(),
    content: "",
    isUser: false,
    timestamp: new Date(),
    isComplete: false,
  };

  for await (const chunk of stream) {
    botMessage.content = chunk;
    onUpdate({ ...botMessage });
  }

  botMessage.isComplete = true;
  onUpdate({ ...botMessage });
};
