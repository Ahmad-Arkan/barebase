import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetUser } from 'src/helper/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { QueryCategoryDto } from './dto/query-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('stores/:storeId/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(
    @Query() query: QueryCategoryDto,
    @Param('storeId') storeId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.categoriesService.findAll(+storeId, +userId, query);
  }

  @Get(':categoryId')
  findOne(
    @Param('categoryId') categoryId: string,
    @Param('storeId') storeId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.categoriesService.findOne(+categoryId, +storeId, +userId);
  }

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Param('storeId') storeId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.categoriesService.createCategory(
      +storeId,
      +userId,
      createCategoryDto,
    );
  }

  @Patch(':categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Param('storeId') storeId: string,
    @GetUser('userId') userId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(
      +categoryId,
      +storeId,
      +userId,
      updateCategoryDto,
    );
  }

  @Delete(':categoryId')
  delete(
    @Param('categoryId') categoryId: string,
    @Param('storeId') storeId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.categoriesService.deleteCategory(
      +categoryId,
      +storeId,
      +userId,
    );
  }
}
