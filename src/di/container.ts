import { Container } from 'inversify';
import { GetMessageUseCaseImpl } from '../application/GetMessageUseCaseImpl';
import { LoginUseCaseImpl } from '../application/LoginUseCaseImpl';
import { SendMessageUseCaseImpl } from '../application/SendMessageUseCaseImpl';
import { GetMessageUseCase } from '../domain/usecases/GetMessageUseCase';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';
import { InMemoryMessageRepository } from '../infrastructure/repositories/InMemoryMessageRepository';
import { ApiAuthService } from '../infrastructure/services/ApiAuthService';
import { SseChatbotService } from '../infrastructure/services/SseChatbotService';
import { MessageRepository } from '../interfaces/repositories/MessageRepository';
import { AuthService } from '../interfaces/services/AuthService';
import { ChatbotService } from '../interfaces/services/ChatbotService';
import { TYPES } from './type';

export const container = new Container();

container.bind<MessageRepository>(TYPES.MessageRepository).to(InMemoryMessageRepository);
container.bind<ChatbotService>(TYPES.ChatbotService).to(SseChatbotService);
container.bind<AuthService>(TYPES.AuthService).to(ApiAuthService);
container.bind<SendMessageUseCase>(TYPES.SendMessageUseCase).to(SendMessageUseCaseImpl);
container.bind<GetMessageUseCase>(TYPES.GetMessageUseCase).to(GetMessageUseCaseImpl);
container.bind<LoginUseCase>(TYPES.LoginUseCase).to(LoginUseCaseImpl);
