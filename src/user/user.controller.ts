import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utilis/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT_auth')
  @Get()
  findAll() {
    UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE));
    return this.userService.findAll();
  }
  @ApiSecurity('JWT_auth')
  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
  @ApiSecurity('JWT_auth')
  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @ApiSecurity('JWT_auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE));
    return this.userService.remove(+id);
  }
}
