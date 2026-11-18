import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller.js';
import { AdminGuard } from './admin/admin.guard.js';

@Module({
  controllers: [AdminController],
  providers: [AdminGuard]
})
export class AdminModule {}
