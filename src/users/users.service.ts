import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  private get users() {
    return [
      {
        id: 1,
        username: '1',
        password: this.configService.get<string>('ADMIN_PASSWORD'),
      },
    ];
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username) || null;
  }
}

