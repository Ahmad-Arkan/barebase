import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/helper/decorator/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(+userId);
  }

  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @GetUser('userId') userId: string,
  ) {
    return this.usersService.updateUser(updateDto, +userId);
  }

  @Delete()
  deleteUser(@GetUser('userId') userId: string) {
    return this.usersService.deleteUser(+userId);
  }

  // Invitation
  @Get('invitations')
  getInvitations(@GetUser('userId') userId: string) {
    return this.usersService.getInvitations(+userId);
  }

  @Post('invitations')
  joinFromToken(
    @Body('token') token: string,
    @GetUser('userId') userId: string,
  ) {
    return this.usersService.joinFromToken(token, +userId);
  }

  @Post('invitations/:inviteId')
  joinFromInvited(
    @Param('inviteId') inviteId: string,
    @Body('accept') accept: boolean,
    @GetUser('userId') userId: string,
  ) {
    return this.usersService.joinFromInvited(+inviteId, accept, +userId);
  }
}
