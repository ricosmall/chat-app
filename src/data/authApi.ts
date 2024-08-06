import { User } from "../domain/entities/User";

export const authApi = {
  login: async (username: string, password: string): Promise<User> => {
    // 这里应该是实际的API调用
    // 为了演示，我们使用一个模拟的延迟响应
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: "1", username };
  },
};
