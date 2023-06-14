/* eslint-disable prettier/prettier */
import { UsersEntity } from '@app/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UsersEntity => {
  if (context.getType() === 'http') {
    const user = context.switchToHttp().getRequest().user;
    delete user.password
    return user
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
