import React from 'react';
import { ChatWindow } from './components/ChatWindow';
import 'normalize.css';
import { container } from './di/container';
import { SendMessageUseCase } from './domain/usecases/SendMessageUseCase';
import { TYPES } from './di/type';
import { GetMessageUseCase } from './domain/usecases/GetMessageUseCase';
import { ReceiveBotMessageUseCase } from './domain/usecases/ReceiveBotMessageUseCase';

const App: React.FC = () => {
  const sendMessageUseCase = container.get<SendMessageUseCase>(TYPES.SendMessageUseCase);
  const receiveBotMessageUseCase = container.get<ReceiveBotMessageUseCase>(TYPES.ReceiveMessageUseCase);
  const getMessageUseCase = container.get<GetMessageUseCase>(TYPES.GetMessageUseCase);
  return (
    <ChatWindow
      sendMessageUseCase={sendMessageUseCase}
      receiveBotMessageUseCase={receiveBotMessageUseCase}
      getMessageUseCase={getMessageUseCase}
    />
  );
};

export default App;
