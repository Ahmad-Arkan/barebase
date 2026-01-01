import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberRole } from 'src/generated/prisma/enums';
import { QueryMemberDto } from './dto/query-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('stores/:storeId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(@Param('storeId') storeId: string, @Query() query: QueryMemberDto) {
    return this.membersService.findAll(+storeId, query);
  }

  @Get(':userId')
  findOne(@Param('storeId') storeId: string, @Param('userId') userId: string) {
    return this.membersService.findOne(+storeId, +userId);
  }

  @Patch(':memberId')
  updateMember(
    @Param('storeId') storeId: string,
    @Param('userId') userId: string,
    @Body() updateDto: UpdateMemberDto,
  ) {
    return this.membersService.updateMember(+storeId, +userId, updateDto);
  }

  @Delete(':memberId')
  deleteMember(
    @Param('storeId') storeId: string,
    @Param('userId') userId: string,
  ) {
    return this.membersService.deleteMember(+storeId, +userId);
  }
}
