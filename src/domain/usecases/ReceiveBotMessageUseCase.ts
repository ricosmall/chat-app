import { Message } from '../entities/Message';

export interface ReceiveBotMessageUseCase {
  execute(onReceive: (message: Message) => void): () => void;
}
