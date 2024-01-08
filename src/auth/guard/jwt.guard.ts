import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/utilis/constants';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    for (let x = 0; x < Constants.BY_PASS_URL.length; x++) {
      if (request.url === Constants.BY_PASS_URL[x]) return true;
    }

    return super.canActivate(context);
  }
}
