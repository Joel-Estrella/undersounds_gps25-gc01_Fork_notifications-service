import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { extractRoles } from './roles.util';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>('role', context.getHandler());
        if (!requiredRole) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const roles = extractRoles(user);

        if (!roles.includes(requiredRole)) {
            throw new ForbiddenException(`Missing role: ${requiredRole}`);
        }

        return true;
    }
}
