import { Message } from '../../domain/entities/Message';

export interface MessageRepository {
  addMessage(message: Message): Promise<void>;
  getMessages(): Message[];
}
