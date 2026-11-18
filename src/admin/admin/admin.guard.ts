import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // JWTなどの検証で付与されたユーザー情報に role: 'admin' があるか確認
    if (user && user.role === 'admin') {
      return true;
    }
    
    throw new ForbiddenException('管理者権限が必要です');
  }
}
