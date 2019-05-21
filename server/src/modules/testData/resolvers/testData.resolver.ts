import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, TestData } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('TestData')
export class TestDataResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('testDatas')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async testDatas(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TestData[]> {
    return await this.prisma.query.testDatas(args, info);
  }

  @Query('testData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async testData(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TestData> {
    return await this.prisma.query.testData({ where: { id } }, info);
  }

  @Query('testDataConnection')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async testDataConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.testDatasConnection({ ...args }, info);
  }

  @Mutation('createTestData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async createTestData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createTestData(
      {
        data: {
          ...args.data,
        },
      },
      info,
    );
  }

  @Mutation('updateTestData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async updateTestData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const testDataExist = await this.prisma.exists.TestData({ id: args.where.id });

    if (!testDataExist) {
      throw new ApolloError(`TestData not found`);
    }

    return await this.prisma.mutation.updateTestData(
      {
        where: { ...args.where },
        data: {
          ...args.data,
        },
      },
      info,
    );
  }

  @Mutation('deleteTestData')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async deleteTestData(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const testDataExist = await this.prisma.exists.TestData({ id: args.where.id });

    if (!testDataExist) {
      throw new ApolloError(`TestData not found`);
    }

    return await this.prisma.mutation.deleteTestData(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManyTestDatas')
  @Roles('Estudiante')
  @UseGuards(RolesGuard)
  async deleteManyTestDatas(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManyTestDatas(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
