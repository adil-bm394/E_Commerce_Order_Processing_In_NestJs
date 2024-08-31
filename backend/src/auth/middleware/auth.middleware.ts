import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { messages } from 'src/utils/messages';
import { statusCodes } from 'src/utils/statusCodes';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: messages.TOKEN_MISSING,
      });
    }

    try {
     const decoded = await this.jwtService.verifyAsync(token, {
         secret: process.env.JWT_SECRET,
      });
      const user = await this.userModel.findById(decoded.id);

      //console.log("user in AuthMiddleware by decode",user);

      if (!user) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: messages.USER_NOT_FOUND,
        });
      }

      req.user = user; 
      next();
    } catch (error) {
      console.error(`[AuthMiddleware] Authentication error: ${error.message}`);
      return res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: messages.INVALID_TOKEN,
      });
    }
  }
}





//////////////////////////////////////////

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { IS_PUBLIC_KEY } from './public.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException('Token not found');
//     }
//     try {
//       const user = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });

//       request.user = user;
//     } catch {
//       throw new UnauthorizedException('Invalid token');
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
