import { injectable, inject } from 'inversify';
import type { Message } from '../domain/entities/Message';
import type { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';
import type { MessageRepository } from '../interfaces/repositories/MessageRepository';
import type { ChatbotService } from '../interfaces/services/ChatbotService';
import { TYPES } from '../di/type';

@injectable()
export class SendMessageUseCaseImpl implements SendMessageUseCase {
  constructor(
    @inject(TYPES.MessageRepository) private readonly messageRepository: MessageRepository,
    @inject(TYPES.ChatbotService) private readonly chatbotService: ChatbotService,
  ) {}

  async execute(content: string): Promise<void> {
    const userMessage = this.createUserMessage(content);
    await this.messageRepository.addMessage(userMessage);
    await this.chatbotService.sendMessage(content);
  }

  private createUserMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      isUser: true,
      content,
      isComplete: true,
      timestamp: new Date(),
    };
  }
}
