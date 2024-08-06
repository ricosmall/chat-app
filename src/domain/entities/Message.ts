export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isComplete: boolean; // 新增字段，表示消息是否完成
}
