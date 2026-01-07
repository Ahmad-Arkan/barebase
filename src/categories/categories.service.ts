import { MemberRepository } from 'src/members/members.repository';
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { ErrorCode } from 'src/helper/enum/error-code';
import { QueryCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async findAll(storeId: number, userId: number, query: QueryCategoryDto) {
    const member = await this.memberRepository.findOne(storeId, userId);
    if (!member) {
      throw new UnauthorizedException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    return await this.categoriesRepository.findAll(storeId, query);
  }

  async findOne(categoryId: number, storeId: number, userId: number) {
    const member = await this.memberRepository.findOne(storeId, userId);
    if (!member) {
      throw new UnauthorizedException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    const category = await this.categoriesRepository.findOne(
      categoryId,
      storeId,
    );
    if (!category) {
      throw new NotFoundException({
        message: 'Category not found',
        errorCode: ErrorCode.CATEGORY_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return await this.categoriesRepository.findOne(categoryId, storeId);
  }

  async createCategory(
    storeId: number,
    userId: number,
    createCategoryDto: CreateCategoryDto,
  ) {
    const member = await this.memberRepository.findOne(storeId, userId);
    if (!member) {
      throw new UnauthorizedException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    return await this.categoriesRepository.createCategory(
      storeId,
      createCategoryDto,
    );
  }

  async updateCategory(
    categoryId: number,
    storeId: number,
    userId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const member = await this.memberRepository.findOne(storeId, userId);
    if (!member) {
      throw new UnauthorizedException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    return await this.categoriesRepository.updateCategory(
      categoryId,
      storeId,
      updateCategoryDto,
    );
  }

  async deleteCategory(categoryId: number, storeId: number, userId: number) {
    const member = await this.memberRepository.findOne(storeId, userId);
    if (!member) {
      throw new UnauthorizedException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    await this.categoriesRepository.deleteCategory(categoryId, storeId);
    return { success: true, message: 'Category deleted successfully' };
  }
}
