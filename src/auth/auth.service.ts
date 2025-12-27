import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly repo: UserRepository) {}

  login(loginDto) {
    return this.repo.login;
  }
}
