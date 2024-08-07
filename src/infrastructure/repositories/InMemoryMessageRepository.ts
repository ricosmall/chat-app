import { Message } from '../../domain/entities/Message';
import { MessageRepository } from '../../interfaces/repositories/MessageRepository';

export class InMemoryMessageRepository implements MessageRepository {
  private messages: Message[] = [];

  async addMessage(message: Message): Promise<void> {
    this.messages.push(message);
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
