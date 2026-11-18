import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    // パスワード比較（将来的にbcryptを使用することを推奨）
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // ユーザー名が 'admin' なら管理者ロールを付与
    const payload = { 
      username: user.username, 
      sub: user.id,
      role: user.username === 'admin' ? 'admin' : 'user'
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
