export interface SendMessageUseCase {
  execute(content: string): Promise<void>;
}
