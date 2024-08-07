import { Message } from '../../domain/entities/Message';

export interface ChatbotService {
  sendMessage(content: string): Promise<void>;
  subscribeToBotMessages(callback: (message: Message) => void): () => void;
}
