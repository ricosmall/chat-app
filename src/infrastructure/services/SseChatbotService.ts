import { ReadableStream } from 'stream/web';
import { Message } from '../../domain/entities/Message';
import { ChatbotService } from '../../interfaces/services/ChatbotService';

export class SseChatbotService implements ChatbotService {
  private stream: ReadableStream | null = null;
  private botMessage: Message = this.createBotMessage();
  constructor(private session: any) {}
  async sendMessage(content: string): Promise<void> {
    this.stream = this.session.promptStreaming(content);
    this.botMessage = this.createBotMessage();
  }

  subscribeToBotMessages(callback: (message: Message) => void): () => void {
    const sse = async () => {
      if (!this.stream) return;

      for await (const chunk of this.stream) {
        this.botMessage.content = chunk;
        callback({ ...this.botMessage });
      }

      this.botMessage.isComplete = true;

      callback({ ...this.botMessage });
    };

    sse();

    return () => {
      this.stream = null;
    };
  }

  private createBotMessage(): Message {
    return {
      id: Date.now().toString(),
      isUser: false,
      content: '',
      timestamp: new Date(),
      isComplete: false,
    };
  }
}
