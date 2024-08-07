export interface LoginUseCase {
  execute(username: string, password: string): Promise<void>;
}
