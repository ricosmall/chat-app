import { injectable, inject } from 'inversify';
import type { Message } from '../domain/entities/Message';
import type { ReceiveBotMessageUseCase } from '../domain/usecases/ReceiveBotMessageUseCase';
import type { MessageRepository } from '../interfaces/repositories/MessageRepository';
import type { ChatbotService } from '../interfaces/services/ChatbotService';
import { TYPES } from '../di/type';

@injectable()
export class ReceiveBotMessageUseCaseImpl implements ReceiveBotMessageUseCase {
  constructor(
    @inject(TYPES.ChatbotService) private readonly chatBotService: ChatbotService,
    @inject(TYPES.MessageRepository) private messageRepository: MessageRepository,
  ) {}

  execute(onReceive: (message: Message) => void): () => void {
    return this.chatBotService.subscribeToBotMessages(async (botMessage: Message) => {
      await this.messageRepository.addMessage(botMessage);
      onReceive(botMessage);
    });
  }
}
