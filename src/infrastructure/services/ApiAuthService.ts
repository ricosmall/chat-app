import { AuthService } from '../../interfaces/services/AuthService';

export class ApiAuthService implements AuthService {
  async login(username: string, password: string): Promise<void> {
    // TODO:
  }
}
