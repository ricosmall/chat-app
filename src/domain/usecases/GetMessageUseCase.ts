import { Message } from '../entities/Message';

export interface GetMessageUseCase {
  execute(): Message[];
}
