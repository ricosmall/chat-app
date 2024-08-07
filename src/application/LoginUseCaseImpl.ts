import { inject, injectable } from 'inversify';
import type { LoginUseCase } from '../domain/usecases/LoginUseCase';
import type { AuthService } from '../interfaces/services/AuthService';
import { TYPES } from '../di/type';

@injectable()
export class LoginUseCaseImpl implements LoginUseCase {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {}

  async execute(username: string, password: string): Promise<void> {
    await this.authService.login(username, password);
  }
}
