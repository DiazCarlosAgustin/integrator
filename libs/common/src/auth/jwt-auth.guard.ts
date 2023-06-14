/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);

    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }
  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    let authHeaderParts: string[];
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().authentication;
    } else if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      authHeaderParts = (request.headers['authorization'] as string).split(' ');
    }
    authentication = authHeaderParts[1];

    if (!authentication || authHeaderParts.length !== 2) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }

    return authentication;
  }
}
