import { inject, injectable } from 'inversify';
import type { Message } from '../domain/entities/Message';
import type { GetMessageUseCase } from '../domain/usecases/GetMessageUseCase';
import type { MessageRepository } from '../interfaces/repositories/MessageRepository';
import { TYPES } from '../di/type';

@injectable()
export class GetMessageUseCaseImpl implements GetMessageUseCase {
  constructor(@inject(TYPES.MessageRepository) private readonly messageRepository: MessageRepository) {}

  execute(): Message[] {
    return this.messageRepository.getMessages();
  }
}
