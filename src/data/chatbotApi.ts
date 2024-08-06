import { ReadableStream } from "stream/web";

let session: any;

export const chatbotApi = {
  getBotResponseStream: async (message: string): Promise<ReadableStream> => {
    if (!session) {
      session = await (window as any).ai.createTextSession();
    }
    return await session.promptStreaming(message);
  },
};
