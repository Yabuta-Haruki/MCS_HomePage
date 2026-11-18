import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.guard.js';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return { message: '管理者専用ダッシュボードへようこそ' };
  }
}
